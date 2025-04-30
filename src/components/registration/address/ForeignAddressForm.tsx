
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForeignAddressFormProps {
  formData: {
    foreignStreet: string;
    foreignHouseNumber: string;
    foreignPostalCode: string;
    foreignCity: string;
    foreignRegion: string;
    foreignVillage: string;
    foreignVillage2: string;
    foreignMobile: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
}

const ForeignAddressForm = ({ 
  formData, 
  handleChange, 
  isRequired 
}: ForeignAddressFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="foreignStreet">Sokak/Cadde:</Label>
        <Input
          id="foreignStreet"
          value={formData.foreignStreet}
          onChange={handleChange}
          placeholder="Sokak/Cadde adı"
          required={isRequired}
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
          required={isRequired}
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
          required={isRequired}
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
          required={isRequired}
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
          required={isRequired}
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
          required={isRequired}
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
          required={isRequired}
          className="auth-input"
        />
      </div>
    </div>
  );
};

export default ForeignAddressForm;
