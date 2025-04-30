
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import RegistrationWizard from "@/components/RegistrationWizard";
import { registerUser } from "@/utils/authUtils";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleRegisterComplete = async (formData: Record<string, any>) => {
    setLoading(true);
    try {
      // Make sure there's at least a default email for authentication
      const userData = {
        ...formData,
        // Use entered email or generate a placeholder if not provided
        email: formData.email || `user_${Date.now()}@example.com`,
        // Set a default password if not in registration flow
        password: formData.password || "defaultPassword123",
      };
      
      const response = await registerUser(userData);
      
      if (response.success) {
        toast({
          title: t("registration.success"),
          description: t("registration.success.description"),
        });
        navigate("/society-details");
      }
    } catch (error) {
      toast({
        title: t("registration.error"),
        description: t("registration.error.description"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4">
        <Header title={t("register.title")} showBackButton />
        <LanguageSwitcher className="mr-4" />
      </div>
      
      <div className="flex-1">
        <RegistrationWizard onComplete={handleRegisterComplete} isLoading={loading} />
      </div>
    </div>
  );
};

export default Register;
