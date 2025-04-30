
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

interface SelectionFieldsProps {
  maritalStatus: string;
  gender: string;
  nationality: string;
  onSelectChange: (field: string, value: string) => void;
}

const SelectionFields = ({
  maritalStatus,
  gender,
  nationality,
  onSelectChange,
}: SelectionFieldsProps) => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="maritalStatus">{t("registration.maritalStatus")}:</Label>
        <Select 
          value={maritalStatus}
          onValueChange={(value) => onSelectChange("maritalStatus", value)}
        >
          <SelectTrigger className="auth-input">
            <SelectValue placeholder={t("registration.select")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">{t("registration.maritalStatus.single")}</SelectItem>
            <SelectItem value="married">{t("registration.maritalStatus.married")}</SelectItem>
            <SelectItem value="divorced">{t("registration.maritalStatus.divorced")}</SelectItem>
            <SelectItem value="widowed">{t("registration.maritalStatus.widowed")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">{t("registration.gender")}:</Label>
        <Select 
          value={gender}
          onValueChange={(value) => onSelectChange("gender", value)}
        >
          <SelectTrigger className="auth-input">
            <SelectValue placeholder={t("registration.select")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">{t("registration.gender.male")}</SelectItem>
            <SelectItem value="female">{t("registration.gender.female")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality">{t("registration.nationality")}:</Label>
        <Select 
          value={nationality}
          onValueChange={(value) => onSelectChange("nationality", value)}
        >
          <SelectTrigger className="auth-input">
            <SelectValue placeholder={t("registration.select")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tr">{t("registration.nationality.tr")}</SelectItem>
            <SelectItem value="de">{t("registration.nationality.de")}</SelectItem>
            <SelectItem value="al">{t("registration.nationality.al")}</SelectItem>
            <SelectItem value="ba">{t("registration.nationality.ba")}</SelectItem>
            <SelectItem value="ko">{t("registration.nationality.ko")}</SelectItem>
            <SelectItem value="other">{t("registration.nationality.other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SelectionFields;
