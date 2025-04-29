
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
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
import { Checkbox } from "@/components/ui/checkbox";

interface PersonalInfoStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const PersonalInfoStep = ({ initialData, onSubmit }: PersonalInfoStepProps) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    birthPlace: initialData.birthPlace || "",
    birthName: initialData.birthName || "",
    birthDate: initialData.birthDate || null,
    maritalStatus: initialData.maritalStatus || "",
    motherName: initialData.motherName || "",
    fatherName: initialData.fatherName || "",
    gender: initialData.gender || "",
    nationality: initialData.nationality || "",
    // Optional fields
    email: initialData.email || "",
    phone: initialData.phone || "",
    overseasResidence: initialData.overseasResidence || false,
    overseasAddress: initialData.overseasAddress || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, birthDate: date }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="form-personal" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Ad:</Label>
          <Input
            id="firstName"
            value={formData.firstName}
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
            value={formData.lastName}
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
            value={formData.birthPlace}
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
            value={formData.birthName}
            onChange={handleChange}
            placeholder="Doğum adınız"
            className="auth-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Doğum Tarihi:</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal auth-input",
                  !formData.birthDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.birthDate ? (
                  format(formData.birthDate, "dd.MM.yyyy")
                ) : (
                  "Tarih seçin (Gün.Ay.Yıl)"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={formData.birthDate}
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
          <Label htmlFor="maritalStatus">Medeni Durum:</Label>
          <Select 
            value={formData.maritalStatus}
            onValueChange={(value) => handleSelectChange("maritalStatus", value)}
          >
            <SelectTrigger className="auth-input">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Bekar</SelectItem>
              <SelectItem value="married">Evli</SelectItem>
              <SelectItem value="divorced">Boşanmış</SelectItem>
              <SelectItem value="widowed">Dul</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="motherName">Anne Adı:</Label>
          <Input
            id="motherName"
            value={formData.motherName}
            onChange={handleChange}
            placeholder="Anne adı"
            className="auth-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fatherName">Baba Adı:</Label>
          <Input
            id="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Baba adı"
            className="auth-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Cinsiyet:</Label>
          <Select 
            value={formData.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
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
          <Label htmlFor="nationality">Uyruk:</Label>
          <Select 
            value={formData.nationality}
            onValueChange={(value) => handleSelectChange("nationality", value)}
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

        {/* Optional Fields */}
        <div className="space-y-2">
          <Label htmlFor="email">E-posta (Opsiyonel):</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-posta adresiniz"
            className="auth-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon (Opsiyonel):</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefon numaranız"
            className="auth-input"
          />
        </div>

        <div className="md:col-span-2 space-y-4 border-t pt-4 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="overseasResidence" 
              checked={formData.overseasResidence}
              onCheckedChange={(checked) => handleCheckboxChange("overseasResidence", !!checked)}
            />
            <Label 
              htmlFor="overseasResidence" 
              className="text-sm font-medium cursor-pointer"
            >
              Yurtdışında ikamet ediyorum
            </Label>
          </div>

          {formData.overseasResidence && (
            <div className="space-y-2 pl-6">
              <Label htmlFor="overseasAddress">Yurtdışı Adres:</Label>
              <Input
                id="overseasAddress"
                value={formData.overseasAddress}
                onChange={handleChange}
                placeholder="Yurtdışı adresiniz"
                className="auth-input"
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default PersonalInfoStep;
