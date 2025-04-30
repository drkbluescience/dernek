
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoFieldsProps {
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInfoFields = ({
  firstName,
  lastName,
  birthPlace,
  birthName,
  handleChange,
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
          className="auth-input"
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
          className="auth-input"
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
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthName">Doğum Adı:</Label>
        <Input
          id="birthName"
          value={birthName}
          onChange={handleChange}
          placeholder="Doğum adınız"
          className="auth-input"
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
