
import { toast } from "@/components/ui/use-toast";
import { authApi, apiService, memberApi } from "@/services/apiService";
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

    const response = await memberApi.getProfile();

    if (response.success && response.data) {
      // Type assertion for user data response
      const userData = response.data as UserDataResponse;

      console.log("✅ Kullanıcı bilgileri başarıyla çekildi:");
      console.log("👤 Kişisel Bilgiler:", userData.personalInfo);
      console.log("🏠 Adres Bilgileri:", userData.address);
      console.log("👨‍👩‍👧‍👦 Aile Bilgileri:", userData.familyInfo);
      console.log("🏦 Banka Bilgileri:", userData.bankInfo);
      console.log("💰 Ödeme Geçmişi:", userData.paymentHistory);

      return userData;
    } else {
      console.warn("⚠️ Kullanıcı bilgileri çekilemedi:", response.message);
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

// Login user function - now uses real API
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await authApi.login(credentials);

    if (response.success && response.data) {
      // Type assertion for auth response
      const authData = response.data as AuthResponse;

      // Save user data and token
      localStorage.setItem("currentUser", JSON.stringify(authData.user));
      if (authData.token) {
        apiService.setToken(authData.token);
      }

      toast({
        title: "Giriş Başarılı",
        description: `Hoş geldiniz, ${authData.user.name}!`,
      });

      // Fetch user data after successful login
      await fetchUserDataAfterLogin(authData.token);

      return { success: true, message: "Login successful", user: authData.user };
    }

    return { success: false, message: response.message || "Login failed" };
  } catch (error: any) {
    // Fallback to mock data in development
    if (isDevelopment) {
      return loginUserMock(credentials);
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

      toast({
        title: "Kayıt Başarılı",
        description: "Hesabınız başarıyla oluşturuldu!",
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
