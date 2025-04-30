import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { FamilyInfo } from "@/types/society";

interface FamilyMember {
  name: string;
  birthDate: string;
}

interface FamilyInfo {
  maritalStatus: string;
  spouse?: FamilyMember;
  children?: FamilyMember[];
}

interface FamilyInfoSectionProps {
  familyInfo: FamilyInfo;
}

const FamilyInfoSection = ({ familyInfo }: FamilyInfoSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="pt-6 space-y-6">
        <div>
          <p className="text-xs text-society-neutral-gray dark:text-gray-400 mb-1">{t("society.family.maritalStatus")}</p>
          <p className="text-society-dark-text dark:text-gray-200 font-medium">{familyInfo.maritalStatus}</p>
        </div>
        
        {familyInfo.spouse && (
          <div>
            <h3 className="text-md font-semibold mb-3 dark:text-white">{t("society.family.spouse")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.family.name")}</p>
                <p className="text-society-dark-text dark:text-gray-200 font-medium">{familyInfo.spouse.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.family.birthDate")}</p>
                <p className="text-society-dark-text dark:text-gray-200 font-medium">{familyInfo.spouse.birthDate}</p>
              </div>
            </div>
          </div>
        )}
        
        {familyInfo.children && familyInfo.children.length > 0 && (
          <div>
            <h3 className="text-md font-semibold mb-3 dark:text-white">{t("society.family.children")}</h3>
            <div className="space-y-3">
              {familyInfo.children.map((child, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.family.name")}</p>
                    <p className="text-society-dark-text dark:text-gray-200 font-medium">{child.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.family.birthDate")}</p>
                    <p className="text-society-dark-text dark:text-gray-200 font-medium">{child.birthDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyInfoSection;
