
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface BirthDateFieldProps {
  birthDate: Date | null;
  onDateChange: (date: Date | undefined) => void;
}

const BirthDateField = ({ birthDate, onDateChange }: BirthDateFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="birthDate">Doğum Tarihi:</Label>
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
            {birthDate ? (
              format(birthDate, "dd.MM.yyyy")
            ) : (
              "Tarih seçin (Gün.Ay.Yıl)"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0" 
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <Calendar
            mode="single"
            selected={birthDate}
            onSelect={onDateChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BirthDateField;
