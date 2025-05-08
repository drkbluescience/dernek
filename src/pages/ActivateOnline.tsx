
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const ActivateOnline = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Define form schema with validation
  const formSchema = z.object({
    memberId: z.string().min(1, { message: t("validation.required") }),
    firstName: z.string().min(1, { message: t("validation.required") }),
    lastName: z.string().min(1, { message: t("validation.required") }),
    birthDate: z.date({
      required_error: t("validation.required"),
    }),
    contactInfo: z.string().min(1, { message: t("validation.required") }),
  });

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: "",
      firstName: "",
      lastName: "",
      contactInfo: "",
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be an API call
      console.log("Activation request submitted:", values);
      
      // Show success message
      toast({
        title: t("activate.success.title"),
        description: t("activate.success.description"),
      });
      
      // Navigate to login after successful activation
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast({
        title: t("activate.error.title"),
        description: t("activate.error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4">
        <Header title={t("activate.title")} showBackButton />
        <LanguageSwitcher className="mr-4" />
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-sm animate-fade-in">
          <h1 className="text-2xl font-bold mb-6 text-center text-society-dark-text">
            {t("activate.header")}
          </h1>
          <p className="text-society-neutral-gray mb-6 text-center">
            {t("activate.description")}
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="memberId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("activate.memberId")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("activate.memberId.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("activate.firstName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("activate.firstName.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("activate.lastName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("activate.lastName.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("activate.birthDate")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd.MM.yyyy")
                            ) : (
                              <span>{t("activate.birthDate.placeholder")}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("activate.contactInfo")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("activate.contactInfo.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs">
                      {t("activate.contactInfo.hint")}
                    </FormMessage>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("activate.submitting") : t("activate.submit")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ActivateOnline;
