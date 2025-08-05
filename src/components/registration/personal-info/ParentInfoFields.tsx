
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";

interface ParentInfoFieldsProps {
  motherName: string;
  fatherName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ParentInfoFields = ({
  motherName,
  fatherName,
  handleChange,
}: ParentInfoFieldsProps) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="motherName">{t("registration.personal.motherName")}:</Label>
        <Input
          id="motherName"
          value={motherName}
          onChange={handleChange}
          placeholder={t("registration.personal.motherName.placeholder")}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fatherName">{t("registration.personal.fatherName")}:</Label>
        <Input
          id="fatherName"
          value={fatherName}
          onChange={handleChange}
          placeholder={t("registration.personal.fatherName.placeholder")}
          className="auth-input"
        />
      </div>
    </>
  );
};

export default ParentInfoFields;
