
import { useState } from "react";

export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthName: string;
  birthDate: Date | null;
  maritalStatus: string;
  motherName: string;
  fatherName: string;
  gender: string;
  nationality: string;
}

interface UsePersonalInfoFormProps {
  initialData: Record<string, any>;
}

export const usePersonalInfoForm = ({ initialData }: UsePersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfoFormData>({
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, birthDate: date || null }));
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleDateChange
  };
};
