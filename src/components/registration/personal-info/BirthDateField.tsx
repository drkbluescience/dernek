
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface BirthDateFieldProps {
  birthDate: Date | null;
  onDateChange: (date: Date | undefined) => void;
}

const BirthDateField = ({ birthDate, onDateChange }: BirthDateFieldProps) => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(
    birthDate ? birthDate.getFullYear() : currentYear - 30
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    birthDate ? birthDate.getMonth() : 0
  );

  // Generate year options (from 1900 to current year)
  const yearOptions = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  // Month names based on selected language
  const getMonthNames = () => {
    if (language === 'de') {
      return [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
      ];
    }
    // Default to Turkish
    return [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
  };

  const monthNames = getMonthNames();

  const handleYearChange = (year: string) => {
    const yearNum = parseInt(year);
    setSelectedYear(yearNum);

    // Update the date if we have a current selection
    if (birthDate) {
      const newDate = new Date(yearNum, birthDate.getMonth(), birthDate.getDate());
      onDateChange(newDate);
    }
  };

  const handleMonthChange = (month: string) => {
    const monthNum = parseInt(month);
    setSelectedMonth(monthNum);

    // Update the date if we have a current selection
    if (birthDate) {
      const newDate = new Date(birthDate.getFullYear(), monthNum, birthDate.getDate());
      onDateChange(newDate);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth());
    }
    onDateChange(date);
  };

  // Get localized labels
  const getLabels = () => {
    if (language === 'de') {
      return {
        birthDate: "Geburtsdatum:",
        year: "Jahr",
        month: "Monat",
        dayMonthYear: "(Tag.Monat.Jahr)"
      };
    }
    // Default to Turkish
    return {
      birthDate: "Doğum Tarihi:",
      year: "Yıl",
      month: "Ay",
      dayMonthYear: "(Gün.Ay.Yıl)"
    };
  };

  const labels = getLabels();

  return (
    <div className="space-y-2">
      <Label htmlFor="birthDate">{labels.birthDate}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal auth-input",
              !birthDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {birthDate ? format(birthDate, "dd.MM.yyyy") : labels.dayMonthYear}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <div className="p-3 space-y-3">
            {/* Year and Month Selectors */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground mb-1 block">{labels.year}</Label>
                <Select
                  value={selectedYear.toString()}
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Label className="text-xs text-muted-foreground mb-1 block">{labels.month}</Label>
                <Select
                  value={selectedMonth.toString()}
                  onValueChange={handleMonthChange}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {monthNames.map((month, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Calendar */}
            <Calendar
              mode="single"
              selected={birthDate}
              onSelect={handleCalendarSelect}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              month={new Date(selectedYear, selectedMonth)}
              onMonthChange={(month) => {
                setSelectedYear(month.getFullYear());
                setSelectedMonth(month.getMonth());
              }}
              initialFocus
              className="pointer-events-auto"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BirthDateField;
