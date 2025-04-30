
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SocietyHeaderProps {
  name: string;
  description: string;
  founded: string;
  members: number;
}

const SocietyHeader = ({ name, description, founded, members }: SocietyHeaderProps) => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl dark:text-white">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-society-neutral-gray dark:text-gray-300">{description}</p>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-society-soft-purple p-3 rounded-lg dark:bg-purple-900">
            <p className="text-sm text-society-neutral-gray dark:text-gray-300">Founded</p>
            <p className="font-bold text-society-dark-text dark:text-white">{founded}</p>
          </div>
          <div className="bg-society-soft-purple p-3 rounded-lg dark:bg-purple-900">
            <p className="text-sm text-society-neutral-gray dark:text-gray-300">Members</p>
            <p className="font-bold text-society-dark-text dark:text-white">{members}</p>
          </div>
          <div className="bg-society-soft-purple p-3 rounded-lg dark:bg-purple-900">
            <p className="text-sm text-society-neutral-gray dark:text-gray-300">Events</p>
            <p className="font-bold text-society-dark-text dark:text-white">2</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocietyHeader;
