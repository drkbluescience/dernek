
import { usePersonalInfoForm } from "./personal-info/usePersonalInfoForm";
import BasicInfoFields from "./personal-info/BasicInfoFields";
import BirthDateField from "./personal-info/BirthDateField";
import ParentInfoFields from "./personal-info/ParentInfoFields";
import SelectionFields from "./personal-info/SelectionFields";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ValidationMessages {
  required: string;
  email: string;
  minLength: string;
  maxLength: string;
  pattern: string;
}

interface PersonalInfoStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  validationMessages?: ValidationMessages;
}

const PersonalInfoStep = ({ initialData, onSubmit, validationMessages }: PersonalInfoStepProps) => {
  const { formData, handleChange, handleSelectChange, handleDateChange } = usePersonalInfoForm({ initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguage();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    if (!formData.firstName?.trim()) {
      newErrors.firstName = validationMessages?.required || t("validation.field.empty");
    }
    
    if (!formData.lastName?.trim()) {
      newErrors.lastName = validationMessages?.required || t("validation.field.empty");
    }
    
    // Add more validations as needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getCustomValidationProps = (fieldName: string) => {
    return {
      "data-error": errors[fieldName] || "",
      "aria-invalid": !!errors[fieldName],
      onInvalid: (e: React.InvalidEvent<HTMLInputElement>) => {
        e.preventDefault();
        setErrors({
          ...errors,
          [fieldName]: validationMessages?.required || t("validation.field.empty")
        });
      }
    };
  };

  return (
    <form id="form-personal" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicInfoFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          birthPlace={formData.birthPlace}
          birthName={formData.birthName}
          handleChange={handleChange}
          validationProps={getCustomValidationProps}
          errors={errors}
        />

        <BirthDateField 
          birthDate={formData.birthDate} 
          onDateChange={handleDateChange}
        />

        <SelectionFields
          maritalStatus={formData.maritalStatus}
          gender={formData.gender}
          nationality={formData.nationality}
          onSelectChange={handleSelectChange}
        />

        <ParentInfoFields
          motherName={formData.motherName}
          fatherName={formData.fatherName}
          handleChange={handleChange}
        />
      </div>
      
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>
            {Object.values(errors)[0]}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default PersonalInfoStep;
