
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FamilyInfo as FamilyInfoType } from "@/types/society";

interface FamilyInfoSectionProps {
  familyInfo: FamilyInfoType;
}

const FamilyInfoSection = ({ familyInfo }: FamilyInfoSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Marital Status - Only show if available */}
        {familyInfo.maritalStatus && (
          <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">{t("society.family.maritalStatus")}</span>
            <span className="text-gray-900 dark:text-gray-100">{familyInfo.maritalStatus}</span>
          </div>
        )}

        {familyInfo.spouse && familyInfo.spouse.name && (
          <>
            <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t("society.family.spouse")}</span>
              <span className="text-gray-900 dark:text-gray-100">{familyInfo.spouse.name}</span>
            </div>
            {familyInfo.spouse.birthDate && (
              <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
                <span className="font-medium text-gray-700 dark:text-gray-300">{t("society.family.birthDate")}</span>
                <span className="text-gray-900 dark:text-gray-100">{familyInfo.spouse.birthDate}</span>
              </div>
            )}
          </>
        )}

        {familyInfo.children && familyInfo.children.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">{t("society.family.children")}</h4>
            {familyInfo.children.map((child, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-3 shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t("society.family.name")}</span>
                  <span className="text-gray-900 dark:text-gray-100">{child.name}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t("society.family.birthDate")}</span>
                  <span className="text-gray-900 dark:text-gray-100">{child.birthDate}</span>
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
