
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import { loginUser } from "@/utils/authUtils";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BottomNavigation from "@/components/BottomNavigation";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

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
      label: t("login.email"),
      type: "email",
      placeholder: t("login.email.placeholder"),
    },
    {
      id: "password",
      label: t("login.password"),
      type: "password",
      placeholder: t("login.password.placeholder"),
    },
  ];

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4">
        <Header title={t("login.title")} showBackButton />
        <LanguageSwitcher className="mr-4" />
      </div>
      
      <div className="flex-1 flex items-center">
        <AuthForm
          title={t("login.welcome")}
          fields={loginFields}
          submitText={loading ? t("login.processing") : t("login.button")}
          onSubmit={handleLogin}
          footerText={t("login.no.account")}
          footerLinkText={t("login.register")}
          footerLinkUrl="/register"
          forgotPasswordText={t("login.forgot.password")}
          forgotPasswordUrl="/forgot-password"
        />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Login;
