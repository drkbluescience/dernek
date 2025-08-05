
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="street">{t("registration.address.street")}:</Label>
        <Input
          id="street"
          value={formData.street}
          onChange={handleChange}
          placeholder={t("registration.address.street.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="houseNumber">{t("registration.address.houseNumber")}:</Label>
        <Input
          id="houseNumber"
          value={formData.houseNumber}
          onChange={handleChange}
          placeholder={t("registration.address.houseNumber.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">{t("registration.address.postalCode")}:</Label>
        <Input
          id="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder={t("registration.address.postalCode.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">{t("registration.address.city")}:</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={handleChange}
          placeholder={t("registration.address.city.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">{t("registration.address.district")}:</Label>
        <Input
          id="district"
          value={formData.district}
          onChange={handleChange}
          placeholder={t("registration.address.district.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("registration.address.phone")}:</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t("registration.address.phone.placeholder")}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobile">{t("registration.address.mobile")}:</Label>
        <Input
          id="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder={t("registration.address.mobile.placeholder")}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("registration.address.email")}:</Label>
        <Input
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("registration.address.email.placeholder")}
          className="auth-input"
        />
      </div>
    </div>
  );
};

export default GermanyAddressForm;
