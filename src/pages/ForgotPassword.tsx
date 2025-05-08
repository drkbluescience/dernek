
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Mail, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BottomNavigation from "@/components/BottomNavigation";

type RecoveryMethod = "memberId" | "email" | "phone";

const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState<RecoveryMethod>("email");
  const [inputValue, setInputValue] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue) {
      toast({
        title: t("validation.field.empty"),
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Here we would actually call an API to reset the password
      // For now we'll just simulate a success response
      setTimeout(() => {
        toast({
          title: t("forgot.password.success.title"),
          description: t("forgot.password.success.description"),
        });
        
        // Redirect back to login page after successful submission
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast({
        title: t("forgot.password.error.title"),
        description: t("forgot.password.error.description"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (recoveryMethod) {
      case "memberId":
        return t("forgot.password.memberId.placeholder");
      case "email":
        return t("forgot.password.email.placeholder");
      case "phone":
        return t("forgot.password.phone.placeholder");
      default:
        return "";
    }
  };

  const getInputType = () => {
    switch (recoveryMethod) {
      case "memberId":
        return "text";
      case "email":
        return "email";
      case "phone":
        return "tel";
      default:
        return "text";
    }
  };

  const getIcon = () => {
    switch (recoveryMethod) {
      case "memberId":
        return <User className="mr-2 h-4 w-4" />;
      case "email":
        return <Mail className="mr-2 h-4 w-4" />;
      case "phone":
        return <Phone className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4">
        <Header title={t("forgot.password.title")} showBackButton />
        <LanguageSwitcher className="mr-4" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-4 animate-fade-in">
          <h1 className="text-2xl font-bold text-center mb-6 text-society-dark-text">
            {t("forgot.password.header")}
          </h1>
          <p className="text-center text-gray-600 mb-6">
            {t("forgot.password.description")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recoveryMethod">
                {t("forgot.password.method.select")}
              </Label>
              <Select
                value={recoveryMethod}
                onValueChange={(value) => {
                  setRecoveryMethod(value as RecoveryMethod);
                  setInputValue("");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("forgot.password.method.select")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="memberId">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {t("forgot.password.method.memberId")}
                    </div>
                  </SelectItem>
                  <SelectItem value="email">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {t("forgot.password.method.email")}
                    </div>
                  </SelectItem>
                  <SelectItem value="phone">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      {t("forgot.password.method.phone")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recovery-input">
                {t(`forgot.password.${recoveryMethod}.label`)}
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {getIcon()}
                </div>
                <Input
                  id="recovery-input"
                  type={getInputType()}
                  className="pl-10"
                  placeholder={getPlaceholder()}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !inputValue}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("forgot.password.submitting")}
                </span>
              ) : (
                t("forgot.password.submit")
              )}
            </Button>
          </form>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ForgotPassword;
