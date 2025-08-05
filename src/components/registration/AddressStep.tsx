
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GermanyAddressForm from "./address/GermanyAddressForm";
import ForeignAddressForm from "./address/ForeignAddressForm";
import useAddressForm from "./address/useAddressForm";
import { useLanguage } from "@/context/LanguageContext";

interface AddressStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const AddressStep = ({ initialData, onSubmit }: AddressStepProps) => {
  const { t } = useLanguage();
  const { formData, handleChange, handleSelectChange, handleAddressTypeChange } = useAddressForm(initialData);

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
          <TabsTrigger value="germany">{t("registration.address.germany")}</TabsTrigger>
          <TabsTrigger value="foreign">{t("registration.address.foreign")}</TabsTrigger>
        </TabsList>
        
        {/* Almanya Adresi */}
        <TabsContent value="germany" className="mt-4">
          <GermanyAddressForm
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            isRequired={formData.addressType === "germany"}
          />
        </TabsContent>
        
        {/* Yurtdışı Adresi */}
        <TabsContent value="foreign" className="mt-4">
          <ForeignAddressForm
            formData={formData}
            handleChange={handleChange}
            isRequired={formData.addressType === "foreign"}
          />
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default AddressStep;
