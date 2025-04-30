
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FamilyInfoStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const FamilyInfoStep = ({ initialData, onSubmit }: FamilyInfoStepProps) => {
  const isMarried = initialData.maritalStatus === "married";
  const [hasSpouse, setHasSpouse] = useState(isMarried && initialData.hasSpouse !== false);
  
  // Get the user's gender from initialData
  const userGender = initialData.gender || "";
  
  // Determine spouse gender based on user gender
  const getAutomaticSpouseGender = () => {
    if (userGender === "male") return "female";
    if (userGender === "female") return "male";
    return "";
  };
  
  const [formData, setFormData] = useState({
    hasSpouse: isMarried && initialData.hasSpouse !== false,
    spouseFirstName: initialData.spouseFirstName || "",
    spouseLastName: initialData.spouseLastName || "",
    spouseBirthPlace: initialData.spouseBirthPlace || "",
    spouseBirthName: initialData.spouseBirthName || "",
    spouseBirthDate: initialData.spouseBirthDate || null,
    spouseMotherName: initialData.spouseMotherName || "",
    spouseFatherName: initialData.spouseFatherName || "",
    spouseGender: initialData.spouseGender || getAutomaticSpouseGender(),
    spouseNationality: initialData.spouseNationality || "",
    spouseReligion: initialData.spouseReligion || "",
  });

  // Update spouse gender when user gender changes
  useEffect(() => {
    if (userGender && !initialData.spouseGender) {
      setFormData(prev => ({
        ...prev,
        spouseGender: getAutomaticSpouseGender()
      }));
    }
  }, [userGender, initialData.spouseGender]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, spouseBirthDate: date }));
  };

  const handleHasSpouseChange = (checked: boolean) => {
    setHasSpouse(checked);
    setFormData((prev) => ({ ...prev, hasSpouse: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // If not married, auto-submit and skip
  if (!isMarried) {
    setTimeout(() => {
      onSubmit({ hasSpouse: false });
    }, 0);
    return null;
  }

  return (
    <form id="form-family" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox 
            id="hasSpouse" 
            checked={hasSpouse}
            onCheckedChange={handleHasSpouseChange}
          />
          <Label 
            htmlFor="hasSpouse" 
            className="text-sm font-medium cursor-pointer"
          >
            Eşimin bilgilerini eklemek istiyorum
          </Label>
        </div>

        {hasSpouse && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="spouseFirstName">Eş Adı:</Label>
              <Input
                id="spouseFirstName"
                value={formData.spouseFirstName}
                onChange={handleChange}
                placeholder="Eşin adı"
                required={hasSpouse}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseLastName">Eş Soyadı:</Label>
              <Input
                id="spouseLastName"
                value={formData.spouseLastName}
                onChange={handleChange}
                placeholder="Eşin soyadı"
                required={hasSpouse}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseBirthPlace">Doğum Yeri:</Label>
              <Input
                id="spouseBirthPlace"
                value={formData.spouseBirthPlace}
                onChange={handleChange}
                placeholder="Eşin doğum yeri"
                required={hasSpouse}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseBirthName">Doğum Adı:</Label>
              <Input
                id="spouseBirthName"
                value={formData.spouseBirthName}
                onChange={handleChange}
                placeholder="Eşin doğum adı"
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseBirthDate">Doğum Tarihi:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal auth-input",
                      !formData.spouseBirthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.spouseBirthDate ? (
                      format(formData.spouseBirthDate, "dd.MM.yyyy")
                    ) : (
                      "(Gün.Ay.Yıl)"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0" 
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <Calendar
                    mode="single"
                    selected={formData.spouseBirthDate}
                    onSelect={handleDateChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseMotherName">Anne Adı:</Label>
              <Input
                id="spouseMotherName"
                value={formData.spouseMotherName}
                onChange={handleChange}
                placeholder="Eşin anne adı"
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseFatherName">Baba Adı:</Label>
              <Input
                id="spouseFatherName"
                value={formData.spouseFatherName}
                onChange={handleChange}
                placeholder="Eşin baba adı"
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseGender">Cinsiyet:</Label>
              <Select 
                value={formData.spouseGender}
                onValueChange={(value) => handleSelectChange("spouseGender", value)}
              >
                <SelectTrigger className="auth-input">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Erkek</SelectItem>
                  <SelectItem value="female">Kadın</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseNationality">Uyruk:</Label>
              <Select 
                value={formData.spouseNationality}
                onValueChange={(value) => handleSelectChange("spouseNationality", value)}
              >
                <SelectTrigger className="auth-input">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">Türkiye</SelectItem>
                  <SelectItem value="de">Almanya</SelectItem>
                  <SelectItem value="at">Avusturya</SelectItem>
                  <SelectItem value="fr">Fransa</SelectItem>
                  <SelectItem value="nl">Hollanda</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spouseReligion">Din:</Label>
              <Select 
                value={formData.spouseReligion}
                onValueChange={(value) => handleSelectChange("spouseReligion", value)}
              >
                <SelectTrigger className="auth-input">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="islam">İslam</SelectItem>
                  <SelectItem value="christianity">Hristiyanlık</SelectItem>
                  <SelectItem value="judaism">Yahudilik</SelectItem>
                  <SelectItem value="none">Dinsiz</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {!hasSpouse && (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Eş bilgisi eklemeyi seçmediniz. Devam etmek için İleri düğmesine tıklayın.</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default FamilyInfoStep;
