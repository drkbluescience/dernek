
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GermanyAddressFormProps {
  formData: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    district: string;
    phone: string;
    mobile: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  isRequired: boolean;
}

const GermanyAddressForm = ({
  formData,
  handleChange,
  isRequired,
}: GermanyAddressFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="street">Sokak/Cadde:</Label>
        <Input
          id="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Sokak/Cadde adı"
          required={isRequired}
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
          required={isRequired}
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
          required={isRequired}
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
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">İlçe:</Label>
        <Input
          id="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="İlçe"
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefon:</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefon numarası"
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
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-posta:</Label>
        <Input
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-posta adresi"
          className="auth-input"
        />
      </div>
    </div>
  );
};

export default GermanyAddressForm;
