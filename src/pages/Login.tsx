
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import { loginUser } from "@/utils/authUtils";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      
      if (response.success) {
        navigate("/society-details");
      }
    } finally {
      setLoading(false);
    }
  };

  const loginFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <div className="page-container">
      <Header title="Login" showBackButton />
      
      <div className="flex-1 flex items-center">
        <AuthForm
          title="Welcome Back"
          fields={loginFields}
          submitText={loading ? "Logging in..." : "Login"}
          onSubmit={handleLogin}
          footerText="Don't have an account?"
          footerLinkText="Register"
          footerLinkUrl="/register"
        />
      </div>
    </div>
  );
};

export default Login;
