
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddressStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const AddressStep = ({ initialData, onSubmit }: AddressStepProps) => {
  const [formData, setFormData] = useState({
    // Almanya adresi
    street: initialData.street || "",
    houseNumber: initialData.houseNumber || "",
    postalCode: initialData.postalCode || "",
    city: initialData.city || "",
    district: initialData.district || "",
    phone: initialData.phone || "",
    mobile: initialData.mobile || "",
    email: initialData.email || "",
    
    // Yurtdışı adresi
    foreignStreet: initialData.foreignStreet || "",
    foreignHouseNumber: initialData.foreignHouseNumber || "",
    foreignPostalCode: initialData.foreignPostalCode || "",
    foreignCity: initialData.foreignCity || "",
    foreignRegion: initialData.foreignRegion || "",
    foreignVillage: initialData.foreignVillage || "",
    foreignVillage2: initialData.foreignVillage2 || "",
    foreignMobile: initialData.foreignMobile || "",
    
    // Seçili adres tipi
    addressType: initialData.addressType || "germany"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, addressType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="form-address" onSubmit={handleSubmit}>
      <Tabs 
        defaultValue={formData.addressType} 
        className="w-full" 
        onValueChange={handleAddressTypeChange}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="germany">Almanya'da İkamet</TabsTrigger>
          <TabsTrigger value="foreign">Yurtdışı İkamet</TabsTrigger>
        </TabsList>
        
        {/* Almanya Adresi */}
        <TabsContent value="germany" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="street">Sokak/Cadde:</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Sokak/Cadde adı"
                required={formData.addressType === "germany"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="houseNumber">Kapı No:</Label>
              <Input
                id="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="Kapı/Daire no"
                required={formData.addressType === "germany"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Posta Kodu:</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Posta kodu"
                required={formData.addressType === "germany"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Şehir:</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Şehir"
                required={formData.addressType === "germany"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">Bölge/Eyalet:</Label>
              <Select 
                value={formData.district}
                onValueChange={(value) => handleSelectChange("district", value)}
              >
                <SelectTrigger className="auth-input">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bayern">Bayern</SelectItem>
                  <SelectItem value="berlin">Berlin</SelectItem>
                  <SelectItem value="bremen">Bremen</SelectItem>
                  <SelectItem value="hamburg">Hamburg</SelectItem>
                  <SelectItem value="hessen">Hessen</SelectItem>
                  <SelectItem value="niedersachsen">Niedersachsen</SelectItem>
                  <SelectItem value="nrw">Nordrhein-Westfalen</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon:</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Sabit telefon"
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Cep Telefonu:</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Cep telefonu"
                required={formData.addressType === "germany"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta:</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta adresiniz"
                required={formData.addressType === "germany"}
                className="auth-input"
              />
            </div>
          </div>
        </TabsContent>
        
        {/* Yurtdışı Adresi */}
        <TabsContent value="foreign" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="foreignStreet">Sokak/Cadde:</Label>
              <Input
                id="foreignStreet"
                value={formData.foreignStreet}
                onChange={handleChange}
                placeholder="Sokak/Cadde adı"
                required={formData.addressType === "foreign"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foreignHouseNumber">Kapı No:</Label>
              <Input
                id="foreignHouseNumber"
                value={formData.foreignHouseNumber}
                onChange={handleChange}
                placeholder="Kapı/Daire no"
                required={formData.addressType === "foreign"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foreignPostalCode">Posta Kodu:</Label>
              <Input
                id="foreignPostalCode"
                value={formData.foreignPostalCode}
                onChange={handleChange}
                placeholder="Posta kodu"
                required={formData.addressType === "foreign"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foreignCity">Şehir:</Label>
              <Input
                id="foreignCity"
                value={formData.foreignCity}
                onChange={handleChange}
                placeholder="Şehir"
                required={formData.addressType === "foreign"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foreignRegion">İlçe:</Label>
              <Input
                id="foreignRegion"
                value={formData.foreignRegion}
                onChange={handleChange}
                placeholder="İlçe"
                required={formData.addressType === "foreign"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foreignVillage">Mahalle:</Label>
              <Input
                id="foreignVillage"
                value={formData.foreignVillage}
                onChange={handleChange}
                placeholder="Mahalle"
                required={formData.addressType === "foreign"}
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foreignVillage2">Köy/Kasaba:</Label>
              <Input
                id="foreignVillage2"
                value={formData.foreignVillage2}
                onChange={handleChange}
                placeholder="Köy/Kasaba"
                className="auth-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foreignMobile">Cep Telefonu:</Label>
              <Input
                id="foreignMobile"
                value={formData.foreignMobile}
                onChange={handleChange}
                placeholder="Cep telefonu"
                required={formData.addressType === "foreign"}
                className="auth-input"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default AddressStep;
