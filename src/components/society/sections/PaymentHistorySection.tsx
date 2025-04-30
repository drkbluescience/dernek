
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useLanguage } from "@/context/LanguageContext";

interface Payment {
  id: string;
  date: string;
  amount: string;
  type: string;
  status: string;
}

interface PaymentHistorySectionProps {
  paymentHistory: Payment[];
}

const PaymentHistorySection = ({ paymentHistory }: PaymentHistorySectionProps) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default PaymentHistorySection;
