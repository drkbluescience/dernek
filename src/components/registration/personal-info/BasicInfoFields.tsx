
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";

interface BasicInfoFieldsProps {
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationProps?: (fieldName: string) => Record<string, any>;
  errors?: Record<string, string>;
}

const BasicInfoFields = ({
  firstName,
  lastName,
  birthPlace,
  birthName,
  handleChange,
  validationProps,
  errors,
}: BasicInfoFieldsProps) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="firstName">{t("registration.personal.firstName")}:</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder={t("registration.personal.firstName.placeholder")}
          required
          className={`auth-input ${errors?.firstName ? "border-red-500" : ""}`}
          {...(validationProps ? validationProps("firstName") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">{t("registration.personal.lastName")}:</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder={t("registration.personal.lastName.placeholder")}
          required
          className={`auth-input ${errors?.lastName ? "border-red-500" : ""}`}
          {...(validationProps ? validationProps("lastName") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthPlace">{t("registration.personal.birthPlace")}:</Label>
        <Input
          id="birthPlace"
          value={birthPlace}
          onChange={handleChange}
          placeholder={t("registration.personal.birthPlace.placeholder")}
          required
          className={`auth-input ${errors?.birthPlace ? "border-red-500" : ""}`}
          {...(validationProps ? validationProps("birthPlace") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthName">{t("registration.personal.birthName")}:</Label>
        <Input
          id="birthName"
          value={birthName}
          onChange={handleChange}
          placeholder={t("registration.personal.birthName.placeholder")}
          className="auth-input"
          {...(validationProps ? validationProps("birthName") : {})}
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
