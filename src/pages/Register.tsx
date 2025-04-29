
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import RegistrationWizard from "@/components/RegistrationWizard";
import { registerUser } from "@/utils/authUtils";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegisterComplete = async (formData: Record<string, any>) => {
    setLoading(true);
    try {
      const response = await registerUser(formData);
      
      if (response.success) {
        toast({
          title: "Kayıt Başarılı",
          description: "Hesabınız başarıyla oluşturuldu!",
        });
        navigate("/society-details");
      }
    } catch (error) {
      toast({
        title: "Kayıt Hatası",
        description: "Kayıt işlemi sırasında bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header title="Kayıt" showBackButton />
      
      <div className="flex-1">
        <RegistrationWizard onComplete={handleRegisterComplete} isLoading={loading} />
      </div>
    </div>
  );
};

export default Register;
