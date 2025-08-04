import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Payment } from "@/types/society";

interface PaymentHistorySectionProps {
  paymentHistory: Payment[];
  rawPaymentData?: any[]; // Raw feeMatches array from API
}

const PaymentHistorySection = ({ paymentHistory, rawPaymentData }: PaymentHistorySectionProps) => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  console.log("🔍 PaymentHistorySection received:");
  console.log("- paymentHistory:", paymentHistory);
  console.log("- rawPaymentData:", rawPaymentData);

  // Simple approach: use rawPaymentData directly if available
  const displayData = useMemo(() => {
    // If we have raw payment data, process it simply
    if (rawPaymentData && Array.isArray(rawPaymentData) && rawPaymentData.length > 0) {
      console.log("✅ Using rawPaymentData with", rawPaymentData.length, "items");

      return rawPaymentData.map((fee: any, index: number) => ({
        id: fee.id || `payment-${index}`,
        date: fee.datum ? fee.datum.split('T')[0].split('-').reverse().join('.') : "-",
        amount: fee.soll ? `${fee.soll} €` : (fee.haben ? `${fee.haben} €` : "0 €"),
        type: `Gebühr ${fee.fk_Gebuehren_Id || 'N/A'}`,
        status: fee.haben > 0 ? "Bezahlt" : "Offen",
        eingetragen_am: fee.eingetragen_am ? fee.eingetragen_am.split('T')[0].split('-').reverse().join('.') : "-"
      }));
    }

    // Fallback to processed payment history
    console.log("⚠️ Using fallback paymentHistory with", paymentHistory?.length || 0, "items");
    return paymentHistory || [];
  }, [rawPaymentData, paymentHistory]);

  // Calculate pagination
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = displayData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Show loading or empty state
  if (!displayData || displayData.length === 0) {
    return (
      <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              {t("society.payment.noData")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="pt-6">
        {/* Payment Summary */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {t("society.payment.total")}: {displayData.length} {t("society.payment.entries")}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {t("society.payment.page")} {currentPage} / {totalPages || 1}
            </span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <TableHead className="w-[120px]">{t("society.payment.date")}</TableHead>
              <TableHead>{t("society.payment.amount")}</TableHead>
              <TableHead>{t("society.payment.type")}</TableHead>
              <TableHead className="text-right">{t("society.payment.status")}</TableHead>
              {rawPaymentData && (
                <TableHead className="w-[120px]">{t("society.payment.registered")}</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((payment: any) => (
              <TableRow key={payment.id} className="dark:border-gray-700">
                <TableCell className="font-medium dark:text-gray-300">{payment.date}</TableCell>
                <TableCell className="dark:text-gray-300">{payment.amount}</TableCell>
                <TableCell className="dark:text-gray-300">{payment.type}</TableCell>
                <TableCell className={`text-right ${
                  payment.status === "Bezahlt" || payment.status === "Paid"
                    ? "text-green-600 dark:text-green-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}>
                  {payment.status}
                </TableCell>
                {rawPaymentData && (
                  <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                    {payment.eingetragen_am}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t("society.payment.showing")} {startIndex + 1}-{Math.min(endIndex, displayData.length)} {t("society.payment.of")} {displayData.length}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
                {t("society.payment.previous")}
              </Button>

              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(pageNum)}
                      className="w-8 h-8 p-0 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              >
                {t("society.payment.next")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentHistorySection;
