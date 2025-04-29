
import { toast } from "@/components/ui/use-toast";

// Mock data for demonstration purposes
const mockUsers = [
  {
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    id: "user-1",
  },
];

// Mock function to register users
export const registerUser = (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  return new Promise<{ success: boolean; message: string }>((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const existingUser = mockUsers.find((user) => user.email === userData.email);
      
      if (existingUser) {
        toast({
          title: "Registration Failed",
          description: "Email already in use. Please try again with a different email.",
          variant: "destructive",
        });
        resolve({ success: false, message: "Email already in use" });
        return;
      }
      
      // In a real app, we would save this to a database
      const newUser = {
        ...userData,
        id: `user-${mockUsers.length + 1}`,
      };
      
      mockUsers.push(newUser);
      
      // Save user to localStorage for persistence
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      
      resolve({ success: true, message: "Registration successful" });
    }, 1000);
  });
};

// Mock function to login users
export const loginUser = (credentials: { email: string; password: string }) => {
  return new Promise<{ success: boolean; message: string; user?: any }>(
    (resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          // Save user to localStorage for persistence
          localStorage.setItem("currentUser", JSON.stringify(user));
          
          toast({
            title: "Login Successful",
            description: `Welcome back, ${user.name}!`,
          });
          
          resolve({ success: true, message: "Login successful", user });
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
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
