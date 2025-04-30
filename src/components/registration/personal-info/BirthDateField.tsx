
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
import { useTheme } from "@/context/ThemeContext";

interface BirthDateFieldProps {
  birthDate: Date | null;
  onDateChange: (date: Date | undefined) => void;
}

const BirthDateField = ({ birthDate, onDateChange }: BirthDateFieldProps) => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="birthDate" className="text-society-dark-text">Doğum Tarihi:</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal society-input",
              !birthDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-society-purple" />
            {birthDate ? format(birthDate, "dd.MM.yyyy") : "(Gün.Ay.Yıl)"}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white border-society-purple/20 shadow-md" 
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
            className="p-3 pointer-events-auto bg-white"
            classNames={{
              day_selected: "bg-society-purple text-white hover:bg-society-purple hover:text-white focus:bg-society-purple focus:text-white",
              day_today: "bg-society-soft-purple text-society-purple",
              nav_button_previous: "text-society-purple hover:text-society-secondary-purple",
              nav_button_next: "text-society-purple hover:text-society-secondary-purple",
              caption: "text-society-dark-text",
              cell: "text-society-dark-text",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BirthDateField;
