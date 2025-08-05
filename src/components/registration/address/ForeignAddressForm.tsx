
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="foreignStreet">{t("registration.address.street")}:</Label>
        <Input
          id="foreignStreet"
          value={formData.foreignStreet}
          onChange={handleChange}
          placeholder={t("registration.address.street.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foreignHouseNumber">{t("registration.address.houseNumber")}:</Label>
        <Input
          id="foreignHouseNumber"
          value={formData.foreignHouseNumber}
          onChange={handleChange}
          placeholder={t("registration.address.houseNumber.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foreignPostalCode">{t("registration.address.postalCode")}:</Label>
        <Input
          id="foreignPostalCode"
          value={formData.foreignPostalCode}
          onChange={handleChange}
          placeholder={t("registration.address.postalCode.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foreignCity">{t("registration.address.city")}:</Label>
        <Input
          id="foreignCity"
          value={formData.foreignCity}
          onChange={handleChange}
          placeholder={t("registration.address.city.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foreignRegion">{t("registration.address.foreign.region")}:</Label>
        <Input
          id="foreignRegion"
          value={formData.foreignRegion}
          onChange={handleChange}
          placeholder={t("registration.address.foreign.region.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foreignVillage">{t("registration.address.foreign.village2")}:</Label>
        <Input
          id="foreignVillage"
          value={formData.foreignVillage}
          onChange={handleChange}
          placeholder={t("registration.address.foreign.village2.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foreignVillage2">{t("registration.address.foreign.village")}:</Label>
        <Input
          id="foreignVillage2"
          value={formData.foreignVillage2}
          onChange={handleChange}
          placeholder={t("registration.address.foreign.village.placeholder")}
          className="auth-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foreignMobile">{t("registration.address.mobile")}:</Label>
        <Input
          id="foreignMobile"
          value={formData.foreignMobile}
          onChange={handleChange}
          placeholder={t("registration.address.mobile.placeholder")}
          required={isRequired}
          className="auth-input"
        />
      </div>
    </div>
  );
};

export default ForeignAddressForm;
