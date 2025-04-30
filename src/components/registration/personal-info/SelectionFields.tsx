
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
        <Label htmlFor="maritalStatus" className="text-society-dark-text">{t("society.family.maritalStatus")}:</Label>
        <Select 
          value={maritalStatus}
          onValueChange={(value) => onSelectChange("maritalStatus", value)}
        >
          <SelectTrigger className="w-full rounded-md border border-gray-300 px-3 py-2">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="single">Bekar</SelectItem>
            <SelectItem value="married">Evli</SelectItem>
            <SelectItem value="divorced">Boşanmış</SelectItem>
            <SelectItem value="widowed">Dul</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender" className="text-society-dark-text">{t("society.personal.gender")}:</Label>
        <Select 
          value={gender}
          onValueChange={(value) => onSelectChange("gender", value)}
        >
          <SelectTrigger className="w-full rounded-md border border-gray-300 px-3 py-2">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="male">Erkek</SelectItem>
            <SelectItem value="female">Kadın</SelectItem>
            <SelectItem value="other">Diğer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality" className="text-society-dark-text">Uyruk:</Label>
        <Select 
          value={nationality}
          onValueChange={(value) => onSelectChange("nationality", value)}
        >
          <SelectTrigger className="w-full rounded-md border border-gray-300 px-3 py-2">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="tr">Türkiye</SelectItem>
            <SelectItem value="de">Almanya</SelectItem>
            <SelectItem value="at">Avusturya</SelectItem>
            <SelectItem value="fr">Fransa</SelectItem>
            <SelectItem value="nl">Hollanda</SelectItem>
            <SelectItem value="other">Diğer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SelectionFields;
