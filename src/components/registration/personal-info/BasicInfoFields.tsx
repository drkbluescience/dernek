
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
        <Label htmlFor="firstName" className="text-society-dark-text">{t("society.personal.name").split(" ")[0]}:</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder={t("society.personal.name").split(" ")[0]}
          required
          className={`w-full rounded-md border px-3 py-2 text-base ${errors?.firstName ? "border-red-500" : "border-gray-300"}`}
          {...(validationProps ? validationProps("firstName") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-society-dark-text">{t("society.personal.name").split(" ")[1] || "Soyad"}:</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder={t("society.personal.name").split(" ")[1] || "Soyad"}
          required
          className={`w-full rounded-md border px-3 py-2 text-base ${errors?.lastName ? "border-red-500" : "border-gray-300"}`}
          {...(validationProps ? validationProps("lastName") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthPlace" className="text-society-dark-text">{t("society.personal.birthDate").split(" ")[0] || "Doğum"} Yeri:</Label>
        <Input
          id="birthPlace"
          value={birthPlace}
          onChange={handleChange}
          placeholder="Doğum yeriniz"
          required
          className={`w-full rounded-md border px-3 py-2 text-base ${errors?.birthPlace ? "border-red-500" : "border-gray-300"}`}
          {...(validationProps ? validationProps("birthPlace") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthName" className="text-society-dark-text">{t("society.personal.birthDate").split(" ")[0] || "Doğum"} Adı:</Label>
        <Input
          id="birthName"
          value={birthName}
          onChange={handleChange}
          placeholder="Doğum adınız"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-base"
          {...(validationProps ? validationProps("birthName") : {})}
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
