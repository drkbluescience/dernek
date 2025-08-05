
import { toast } from "@/components/ui/use-toast";
import { authApi, apiService, memberApi, emailApi } from "@/services/apiService";
import { isDevelopment } from "@/config/api";

// Define an interface for our user data
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  memberNumber?: string;
  role?: string;
  [key: string]: any; // Allow for additional fields from the form
}

// Define interface for auth API response
interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    memberNumber?: string;
    role?: string;
    [key: string]: any;
  };
  token: string;
}

// Define interface for user data response from /api/Userdata
interface UserDataResponse {
  personalInfo: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
    nationality?: string;
    memberNumber?: string;
    membershipDate?: string;
    status?: string;
    [key: string]: any;
  };
  address: {
    street?: string;
    houseNumber?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    [key: string]: any;
  };
  familyInfo: {
    maritalStatus?: string;
    spouse?: any;
    children?: any[];
    [key: string]: any;
  };
  bankInfo: {
    accountHolder?: string;
    bankName?: string;
    iban?: string;
    bic?: string;
    [key: string]: any;
  };
  paymentHistory?: any[];
  [key: string]: any;
}

// Mock data for demonstration purposes (fallback)
const mockUsers: User[] = [
  {
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    id: "user-1",
    memberNumber: "M2024001",
    role: "member"
  },
];

// Function to fetch user data after login
const fetchUserDataAfterLogin = async (token: string) => {
  try {
    console.log("🔍 Token ile kullanıcı bilgileri çekiliyor...");
    console.log("📝 Kullanılan Token:", token);

    // Set token for API calls
    apiService.setToken(token);

    const response = await memberApi.getProfile();
    console.log("✅ Userdata Response:", response);

    // Handle both success/data format and direct data format
    const userData = response.success ? response.data : response;

    if (userData && typeof userData === 'object') {
      console.log("🎉 Userdata başarıyla çekildi!");
      console.log("📊 Kullanıcı Detayları:", userData);

      // Update localStorage with complete user data
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const userDataObj = userData as any;
      const updatedUser = {
        ...currentUser,
        ...userDataObj,
        name: userDataObj.name || userDataObj.fullName || userDataObj.briefname || currentUser.name || "Kullanıcı"
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      return userData;
    } else {
      console.log("📊 Userdata Response (veri yok):", response);
      return null;
    }
  } catch (error: any) {
    console.error("❌ Kullanıcı bilgileri çekme hatası:", error);
    console.error("🔍 Hata detayları:", {
      message: error.message,
      status: error.status,
      code: error.code
    });
    return null;
  }
};

// Register user function - now uses real API
export const registerUser = async (userData: Record<string, any>) => {
  try {
    const response = await authApi.register(userData);

    if (response.success && response.data) {
      // Type assertion for auth response
      const authData = response.data as AuthResponse;

      // Save user data and token
      localStorage.setItem("currentUser", JSON.stringify(authData.user));
      if (authData.token) {
        apiService.setToken(authData.token);
      }

      toast({
        title: "Kayıt Başarılı",
        description: "Hesabınız başarıyla oluşturuldu!",
      });

      // Fetch user data after successful registration
      await fetchUserDataAfterLogin(authData.token);

      // Send registration emails
      try {
        const emailData = {
          email: userData.email || authData.user.email,
          name: userData.firstName && userData.lastName ?
                `${userData.firstName} ${userData.lastName}` :
                authData.user.name || "Yeni Üye",
          memberNumber: authData.user.memberNumber,
          registrationData: userData
        };

        // Send welcome email to user
        await emailApi.sendWelcomeEmail(emailData);

        // Send admin notification
        await emailApi.sendAdminNotification(emailData);

        // Send registration confirmation
        await emailApi.sendRegistrationConfirmation(emailData);

        console.log("✅ Registration emails sent successfully");
      } catch (emailError: any) {
        console.error("⚠️ Email sending failed:", emailError);
        // Don't fail registration if email fails
      }

      return { success: true, message: "Registration successful" };
    }

    return { success: false, message: response.message || "Registration failed" };
  } catch (error: any) {
    // Fallback to mock data in development
    if (isDevelopment) {
      return registerUserMock(userData);
    }

    toast({
      title: "Kayıt Başarısız",
      description: error.message || "Kayıt işlemi sırasında bir hata oluştu.",
      variant: "destructive",
    });

    return { success: false, message: error.message || "Registration failed" };
  }
};

// Login user function - now uses real API with username/password
export const loginUser = async (credentials: { username?: string; email?: string; password: string }) => {
  try {
    // Use username for real API, fallback to email for mock
    const loginData = credentials.username
      ? { username: credentials.username, password: credentials.password }
      : { email: credentials.email, password: credentials.password };

    const response = await authApi.login(loginData);

    // Handle API response format: {fk_Vertrag_Id: number, token: string}
    if (response && (response as any).token) {
      const responseData = response as any;

      // Create user object from response
      const user = {
        id: responseData.fk_Vertrag_Id?.toString() || "unknown",
        name: "Kullanıcı", // Will be updated from profile data
        memberNumber: credentials.username || "unknown",
        token: responseData.token
      };

      // Save user data and token
      localStorage.setItem("currentUser", JSON.stringify(user));
      apiService.setToken(responseData.token);

      toast({
        title: "Giriş Başarılı",
        description: `Hoş geldiniz!`,
      });

      // Fetch detailed user data after successful login
      await fetchUserDataAfterLogin(responseData.token);

      return { success: true, message: "Login successful", user };
    }

    return { success: false, message: "Login failed - Invalid credentials" };
  } catch (error: any) {
    // Fallback to mock data in development only if using email
    if (isDevelopment && credentials.email) {
      return loginUserMock({ email: credentials.email, password: credentials.password });
    }

    toast({
      title: "Giriş Başarısız",
      description: error.message || "Giriş işlemi sırasında bir hata oluştu.",
      variant: "destructive",
    });

    return { success: false, message: error.message || "Login failed" };
  }
};

// Mock functions for fallback
const registerUserMock = (userData: Record<string, any>) => {
  return new Promise<{ success: boolean; message: string }>((resolve) => {
    setTimeout(() => {
      const existingUser = mockUsers.find((user) => user.email === userData.email);

      if (existingUser) {
        toast({
          title: "Kayıt Başarısız",
          description: "Bu e-posta adresi zaten kullanılmaktadır.",
          variant: "destructive",
        });
        resolve({ success: false, message: "Email already in use" });
        return;
      }

      const newUser: User = {
        email: userData.email || "user@example.com",
        password: userData.password || "defaultpassword",
        name: userData.firstName && userData.lastName ?
              `${userData.firstName} ${userData.lastName}` :
              userData.name || "New User",
        id: `user-${mockUsers.length + 1}`,
        memberNumber: `M2024${String(mockUsers.length + 1).padStart(3, '0')}`,
        role: "member",
        ...userData,
      };

      mockUsers.push(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      // Simulate email sending in mock mode
      console.log("📧 Mock: Sending welcome email to:", newUser.email);
      console.log("📧 Mock: Sending admin notification for new member:", newUser.name);
      console.log("📧 Mock: Sending registration confirmation to:", newUser.email);

      toast({
        title: "Kayıt Başarılı",
        description: "Hesabınız başarıyla oluşturuldu! Onay e-postası gönderildi.",
      });

      resolve({ success: true, message: "Registration successful" });
    }, 1000);
  });
};

const loginUserMock = (credentials: { email: string; password: string }) => {
  return new Promise<{ success: boolean; message: string; user?: any }>(
    (resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));

          toast({
            title: "Giriş Başarılı",
            description: `Hoş geldiniz, ${user.name}!`,
          });

          resolve({ success: true, message: "Login successful", user });
        } else {
          toast({
            title: "Giriş Başarısız",
            description: "Geçersiz e-posta veya şifre.",
            variant: "destructive",
          });

          resolve({ success: false, message: "Invalid email or password" });
        }
      }, 1000);
    }
  );
};

// Function to log out user
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
  apiService.removeToken();
};

// Function to check if user is logged in
export const isAuthenticated = () => {
  const user = localStorage.getItem("currentUser");
  return !!user;
};

// Function to get current user data
export const getCurrentUser = () => {
  const userData = localStorage.getItem("currentUser");
  return userData ? JSON.parse(userData) : null;
};
