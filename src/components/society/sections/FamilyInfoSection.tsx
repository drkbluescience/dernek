
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FamilyInfo as FamilyInfoType } from "@/types/society";

interface FamilyInfoSectionProps {
  familyInfo: FamilyInfoType;
}

const FamilyInfoSection = ({ familyInfo }: FamilyInfoSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center">
          <span className="font-medium">{t("society.family.maritalStatus")}</span>
          <span>{familyInfo.maritalStatus}</span>
        </div>

        {familyInfo.spouse && (
          <>
            <div className="flex justify-between items-center">
              <span className="font-medium">{t("society.family.spouse")}</span>
              <span>{familyInfo.spouse.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{t("society.family.birthDate")}</span>
              <span>{familyInfo.spouse.birthDate}</span>
            </div>
          </>
        )}

        {familyInfo.children && familyInfo.children.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">{t("society.family.children")}</h4>
            {familyInfo.children.map((child, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{t("society.family.name")}</span>
                  <span>{child.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t("society.family.birthDate")}</span>
                  <span>{child.birthDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyInfoSection;
