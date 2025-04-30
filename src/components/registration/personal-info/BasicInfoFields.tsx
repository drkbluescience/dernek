
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="firstName">Ad:</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="Adınız"
          required
          className={`auth-input ${errors?.firstName ? "border-red-500" : ""}`}
          {...(validationProps ? validationProps("firstName") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Soyad:</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Soyadınız"
          required
          className={`auth-input ${errors?.lastName ? "border-red-500" : ""}`}
          {...(validationProps ? validationProps("lastName") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthPlace">Doğum Yeri:</Label>
        <Input
          id="birthPlace"
          value={birthPlace}
          onChange={handleChange}
          placeholder="Doğum yeriniz"
          required
          className={`auth-input ${errors?.birthPlace ? "border-red-500" : ""}`}
          {...(validationProps ? validationProps("birthPlace") : {})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthName">Kızlık Soyadı:</Label>
        <Input
          id="birthName"
          value={birthName}
          onChange={handleChange}
          placeholder="Kızlık soyadınız"
          className="auth-input"
          {...(validationProps ? validationProps("birthName") : {})}
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
