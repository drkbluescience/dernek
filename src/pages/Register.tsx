
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import { registerUser } from "@/utils/authUtils";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      const response = await registerUser({
        name: data.name,
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

  const registerFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
    },
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
      placeholder: "Create a password",
    },
  ];

  return (
    <div className="page-container">
      <Header title="Register" showBackButton />
      
      <div className="flex-1 flex items-center">
        <AuthForm
          title="Create Account"
          fields={registerFields}
          submitText={loading ? "Creating Account..." : "Register"}
          onSubmit={handleRegister}
          footerText="Already have an account?"
          footerLinkText="Login"
          footerLinkUrl="/login"
        />
      </div>
    </div>
  );
};

export default Register;
