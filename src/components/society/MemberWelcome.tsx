
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface MemberWelcomeProps {
  name: string;
}

const MemberWelcome = ({ name }: MemberWelcomeProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-society-purple rounded-lg p-4 text-white dark:bg-purple-800">
      <h2 className="text-lg">{t("society.welcome")}, {name}!</h2>
      <p className="text-sm opacity-90">{t("society.member.since")} April 2025</p>
    </div>
  );
};

export default MemberWelcome;
