
import { usePersonalInfoForm } from "./personal-info/usePersonalInfoForm";
import BasicInfoFields from "./personal-info/BasicInfoFields";
import BirthDateField from "./personal-info/BirthDateField";
import ParentInfoFields from "./personal-info/ParentInfoFields";
import SelectionFields from "./personal-info/SelectionFields";

interface PersonalInfoStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const PersonalInfoStep = ({ initialData, onSubmit }: PersonalInfoStepProps) => {
  const { formData, handleChange, handleSelectChange, handleDateChange } = usePersonalInfoForm({ initialData });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="form-personal" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicInfoFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          birthPlace={formData.birthPlace}
          birthName={formData.birthName}
          handleChange={handleChange}
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
    </form>
  );
};

export default PersonalInfoStep;
