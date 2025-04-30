
import { useState } from "react";

interface AddressFormData {
  // Almanya adresi
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  district: string;
  phone: string;
  mobile: string;
  email: string;
  
  // Yurtdışı adresi
  foreignStreet: string;
  foreignHouseNumber: string;
  foreignPostalCode: string;
  foreignCity: string;
  foreignRegion: string;
  foreignVillage: string;
  foreignVillage2: string;
  foreignMobile: string;
  
  // Seçili adres tipi
  addressType: string;
}

const useAddressForm = (initialData: Record<string, any>) => {
  const [formData, setFormData] = useState<AddressFormData>({
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

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleAddressTypeChange
  };
};

export default useAddressForm;
