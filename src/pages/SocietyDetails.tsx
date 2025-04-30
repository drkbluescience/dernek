
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser, logoutUser, isAuthenticated } from "@/utils/authUtils";
import { toast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/context/LanguageContext";
import BottomNavigation from "@/components/BottomNavigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SocietyEvent {
  id: number;
  title: string;
  date: string;
  location: string;
}

interface Member {
  id: string;
  name: string;
  role: string;
  joinDate: string;
}

interface Payment {
  id: string;
  date: string;
  amount: string;
  type: string;
  status: string;
}

const SocietyDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const { t } = useLanguage();
  
  // Mock society data
  const societyInfo = {
    name: "Community Helpers Society",
    founded: "2020",
    members: 124,
    description: "A volunteer organization dedicated to helping the community through various social service activities.",
  };

  const upcomingEvents: SocietyEvent[] = [
    {
      id: 1,
      title: "Community Cleanup",
      date: "May 15, 2025",
      location: "City Park",
    },
    {
      id: 2,
      title: "Fundraiser Dinner",
      date: "June 2, 2025",
      location: "Community Center",
    },
  ];

  const committeeMembers: Member[] = [
    {
      id: "m-1",
      name: "Jane Smith",
      role: "President",
      joinDate: "Jan 2020",
    },
    {
      id: "m-2",
      name: "John Doe",
      role: "Secretary",
      joinDate: "Mar 2020",
    },
    {
      id: "m-3",
      name: "Emma Wilson",
      role: "Treasurer",
      joinDate: "Feb 2021",
    },
  ];

  // Mock member personal data
  const personalInfo = {
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+49 123 456 7890",
    birthDate: "15.05.1985",
    gender: "Male",
    address: "Musterstraße 123, 10115 Berlin",
  };

  // Mock family information
  const familyInfo = {
    maritalStatus: "Married",
    spouse: {
      name: "Maria Smith",
      birthDate: "22.08.1988",
    },
    children: [
      {
        name: "Thomas Smith",
        birthDate: "03.12.2012",
      },
      {
        name: "Anna Smith",
        birthDate: "17.06.2016",
      }
    ]
  };

  // Mock bank information
  const bankInfo = {
    accountHolder: "John Smith",
    bankName: "Sparkasse Berlin",
    iban: "DE12 3456 7890 1234 5678 90",
    bic: "SPKRDE21XXX"
  };

  // Mock payment history
  const paymentHistory: Payment[] = [
    {
      id: "p1",
      date: "01.01.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p2",
      date: "01.02.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p3",
      date: "01.03.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p4",
      date: "01.04.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Pending"
    }
  ];

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        navigate("/");
        return;
      }
      
      const userData = getCurrentUser();
      setUser(userData);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    toast({
      title: t("society.logout"),
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="page-container pb-20">
      <Header title={t("society.details.title")} />

      <div className="space-y-6 w-full animate-fade-in">
        {/* User Welcome */}
        <div className="bg-society-purple rounded-lg p-4 text-white dark:bg-purple-800">
          <h2 className="text-lg">{t("society.welcome")}, {user.name}!</h2>
          <p className="text-sm opacity-90">{t("society.member.since")} April 2025</p>
        </div>

        {/* Society Info */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl dark:text-white">{societyInfo.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-society-neutral-gray dark:text-gray-300">{societyInfo.description}</p>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-society-soft-purple p-3 rounded-lg dark:bg-purple-900">
                <p className="text-sm text-society-neutral-gray dark:text-gray-300">{t("society.founded")}</p>
                <p className="font-bold text-society-dark-text dark:text-white">{societyInfo.founded}</p>
              </div>
              <div className="bg-society-soft-purple p-3 rounded-lg dark:bg-purple-900">
                <p className="text-sm text-society-neutral-gray dark:text-gray-300">{t("society.members")}</p>
                <p className="font-bold text-society-dark-text dark:text-white">{societyInfo.members}</p>
              </div>
              <div className="bg-society-soft-purple p-3 rounded-lg dark:bg-purple-900">
                <p className="text-sm text-society-neutral-gray dark:text-gray-300">{t("society.events")}</p>
                <p className="font-bold text-society-dark-text dark:text-white">{upcomingEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Member Information Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {/* Personal Info Section */}
          <AccordionItem value="personal">
            <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted rounded-t-lg">
              {t("society.tab.personal")}
            </AccordionTrigger>
            <AccordionContent className="pt-0">
              <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(personalInfo).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <p className="text-xs text-society-neutral-gray dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-society-dark-text dark:text-gray-200 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          
          {/* Family Info Section */}
          <AccordionItem value="family">
            <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted">
              {t("society.tab.family")}
            </AccordionTrigger>
            <AccordionContent className="pt-0">
              <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <p className="text-xs text-society-neutral-gray dark:text-gray-400 mb-1">Marital Status</p>
                    <p className="text-society-dark-text dark:text-gray-200 font-medium">{familyInfo.maritalStatus}</p>
                  </div>
                  
                  {familyInfo.spouse && (
                    <div>
                      <h3 className="text-md font-semibold mb-3 dark:text-white">Spouse</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-society-neutral-gray dark:text-gray-400">Name</p>
                          <p className="text-society-dark-text dark:text-gray-200 font-medium">{familyInfo.spouse.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-society-neutral-gray dark:text-gray-400">Birth Date</p>
                          <p className="text-society-dark-text dark:text-gray-200 font-medium">{familyInfo.spouse.birthDate}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {familyInfo.children && familyInfo.children.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold mb-3 dark:text-white">Children</h3>
                      <div className="space-y-3">
                        {familyInfo.children.map((child, index) => (
                          <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="space-y-1">
                              <p className="text-xs text-society-neutral-gray dark:text-gray-400">Name</p>
                              <p className="text-society-dark-text dark:text-gray-200 font-medium">{child.name}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-society-neutral-gray dark:text-gray-400">Birth Date</p>
                              <p className="text-society-dark-text dark:text-gray-200 font-medium">{child.birthDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          
          {/* Bank Info Section */}
          <AccordionItem value="bank">
            <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted">
              {t("society.tab.bank")}
            </AccordionTrigger>
            <AccordionContent className="pt-0">
              <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.holder")}</p>
                      <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.accountHolder}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.account")}</p>
                      <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.bankName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.iban")}</p>
                      <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.iban}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.bic")}</p>
                      <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.bic}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          
          {/* Payment History Section */}
          <AccordionItem value="payments">
            <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted">
              {t("society.tab.payments")}
            </AccordionTrigger>
            <AccordionContent className="pt-0">
              <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <TableHead className="w-[120px]">{t("society.payment.date")}</TableHead>
                        <TableHead>{t("society.payment.amount")}</TableHead>
                        <TableHead>{t("society.payment.type")}</TableHead>
                        <TableHead className="text-right">{t("society.payment.status")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id} className="dark:border-gray-700">
                          <TableCell className="font-medium dark:text-gray-300">{payment.date}</TableCell>
                          <TableCell className="dark:text-gray-300">{payment.amount}</TableCell>
                          <TableCell className="dark:text-gray-300">{payment.type}</TableCell>
                          <TableCell className={`text-right ${
                            payment.status === "Paid" 
                              ? "text-green-600 dark:text-green-400" 
                              : "text-amber-600 dark:text-amber-400"
                          }`}>
                            {payment.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-semibold mb-3 px-1 dark:text-white">{t("society.events")}</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="h-2 bg-society-purple w-full"></div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-society-dark-text dark:text-white">{event.title}</h3>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-society-neutral-gray dark:text-gray-400">{event.date}</span>
                    <span className="text-society-neutral-gray dark:text-gray-400">{event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Committee Members */}
        <div>
          <h2 className="text-xl font-semibold mb-3 px-1 dark:text-white">{t("society.committee")}</h2>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-0">
              {committeeMembers.map((member, index) => (
                <React.Fragment key={member.id}>
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium dark:text-white">{member.name}</h3>
                        <p className="text-sm text-society-neutral-gray dark:text-gray-400">{member.role}</p>
                      </div>
                      <p className="text-xs text-society-neutral-gray dark:text-gray-400 self-end">
                        Since {member.joinDate}
                      </p>
                    </div>
                  </div>
                  {index < committeeMembers.length - 1 && <Separator className="dark:bg-gray-700" />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full border-society-purple text-society-purple hover:bg-society-soft-purple hover:text-society-purple mt-6 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-900"
          onClick={handleLogout}
        >
          {t("society.logout")}
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SocietyDetails;
