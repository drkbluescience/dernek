
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="motherName">Anne Adı:</Label>
        <Input
          id="motherName"
          value={motherName}
          onChange={handleChange}
          placeholder="Anne adı"
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fatherName">Baba Adı:</Label>
        <Input
          id="fatherName"
          value={fatherName}
          onChange={handleChange}
          placeholder="Baba adı"
          className="auth-input"
        />
      </div>
    </>
  );
};

export default ParentInfoFields;
