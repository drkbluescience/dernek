
import React from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  address: string;
  status?: string; // Added status field
}

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  handleEdit: (field: string, currentValue: string) => void;
  handleAddressEdit: () => void;
}

const PersonalInfoSection = ({ 
  personalInfo, 
  handleEdit,
  handleAddressEdit
}: PersonalInfoSectionProps) => {
  const { t } = useLanguage();

  // Function to determine badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch(status?.toLowerCase()) {
      case "aktif":
      case "active":
        return "default"; // green
      case "inaktiv":
      case "inactive":
        return "secondary"; // gray
      case "onay bekliyor":
      case "pending":
        return "outline"; // outlined
      default:
        return "default";
    }
  };

  return (
    <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="pt-6 space-y-4">
        {/* Membership Status - Full Width Row */}
        <div className="space-y-1 pb-1 border-b border-gray-100 dark:border-gray-700">
          <p className="text-xs text-society-neutral-gray dark:text-gray-400">
            {t("society.personal.status") || "Üyelik Statüsü"}
          </p>
          <div className="flex items-center">
            <Badge 
              variant={getBadgeVariant(personalInfo.status || "aktif")} 
              className="font-medium"
            >
              {personalInfo.status || "Aktif"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Name and edit button */}
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">
              {t("society.personal.name")}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-society-dark-text dark:text-gray-200 font-medium">{personalInfo.fullName}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => handleEdit("fullName", personalInfo.fullName)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Name</span>
              </Button>
            </div>
          </div>
          
          {/* Birth Date */}
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">
              {t("society.personal.birthDate")}
            </p>
            <p className="text-society-dark-text dark:text-gray-200 font-medium">{personalInfo.birthDate}</p>
          </div>
          
          {/* Gender */}
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">
              {t("society.personal.gender")}
            </p>
            <p className="text-society-dark-text dark:text-gray-200 font-medium">{personalInfo.gender}</p>
          </div>
        </div>
        
        {/* Email - Full Width Row */}
        <div className="space-y-1">
          <p className="text-xs text-society-neutral-gray dark:text-gray-400">
            {t("society.personal.email")}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-society-dark-text dark:text-gray-200 font-medium overflow-ellipsis">{personalInfo.email}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 ml-2 flex-shrink-0" 
              onClick={() => handleEdit("email", personalInfo.email)}
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Edit Email</span>
            </Button>
          </div>
        </div>
        
        {/* Phone - Full Width Row */}
        <div className="space-y-1">
          <p className="text-xs text-society-neutral-gray dark:text-gray-400">
            {t("society.personal.phone")}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-society-dark-text dark:text-gray-200 font-medium">{personalInfo.phone}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 ml-2 flex-shrink-0" 
              onClick={() => handleEdit("phone", personalInfo.phone)}
            >
              <Phone className="h-4 w-4" />
              <span className="sr-only">Edit Phone</span>
            </Button>
          </div>
        </div>
        
        {/* Address - Full Width Row */}
        <div className="space-y-1">
          <p className="text-xs text-society-neutral-gray dark:text-gray-400">
            {t("society.personal.address")}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-society-dark-text dark:text-gray-200 font-medium">{personalInfo.address}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 ml-2 flex-shrink-0" 
              onClick={handleAddressEdit}
            >
              <MapPin className="h-4 w-4" />
              <span className="sr-only">Edit Address</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
