import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthDate: Date | null;
  gender: string;
}

interface ChildInfoStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const ChildInfoStep = ({ initialData, onSubmit }: ChildInfoStepProps) => {
  const [hasChildren, setHasChildren] = useState(initialData.hasChildren !== false);
  const [children, setChildren] = useState<Child[]>(
    initialData.children || [
      { id: '1', firstName: '', lastName: '', birthPlace: '', birthDate: null, gender: '' }
    ]
  );

  const handleHasChildrenChange = (checked: boolean) => {
    setHasChildren(checked);
    if (checked && children.length === 0) {
      setChildren([{ id: '1', firstName: '', lastName: '', birthPlace: '', birthDate: null, gender: '' }]);
    }
  };

  const handleChildChange = (id: string, field: keyof Child, value: any) => {
    setChildren(children.map(child => 
      child.id === id ? { ...child, [field]: value } : child
    ));
  };

  const addChild = () => {
    const newId = (children.length + 1).toString();
    setChildren([...children, { id: newId, firstName: '', lastName: '', birthPlace: '', birthDate: null, gender: '' }]);
  };

  const removeChild = (id: string) => {
    if (children.length > 1) {
      setChildren(children.filter(child => child.id !== id));
    } else {
      // If it's the last child, just reset the form
      setChildren([{ id: '1', firstName: '', lastName: '', birthPlace: '', birthDate: null, gender: '' }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      hasChildren,
      children: hasChildren ? children : []
    });
  };

  return (
    <form id="form-children" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox 
            id="hasChildren" 
            checked={hasChildren}
            onCheckedChange={handleHasChildrenChange}
          />
          <Label 
            htmlFor="hasChildren" 
            className="text-sm font-medium cursor-pointer"
          >
            Çocuklarımın bilgilerini eklemek istiyorum
          </Label>
        </div>

        {hasChildren && (
          <>
            {children.map((child, index) => (
              <Card key={child.id} className="mb-4 border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-6">
                  <CardTitle className="text-lg font-medium">
                    Çocuk {index + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeChild(child.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-0 px-6 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`firstName-${child.id}`}>Ad:</Label>
                      <Input
                        id={`firstName-${child.id}`}
                        value={child.firstName}
                        onChange={(e) => handleChildChange(child.id, 'firstName', e.target.value)}
                        placeholder="Çocuğun adı"
                        required={hasChildren}
                        className="auth-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`lastName-${child.id}`}>Soyad:</Label>
                      <Input
                        id={`lastName-${child.id}`}
                        value={child.lastName}
                        onChange={(e) => handleChildChange(child.id, 'lastName', e.target.value)}
                        placeholder="Çocuğun soyadı"
                        required={hasChildren}
                        className="auth-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`birthPlace-${child.id}`}>Doğum Yeri:</Label>
                      <Input
                        id={`birthPlace-${child.id}`}
                        value={child.birthPlace}
                        onChange={(e) => handleChildChange(child.id, 'birthPlace', e.target.value)}
                        placeholder="Doğum yeri"
                        required={hasChildren}
                        className="auth-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`birthDate-${child.id}`}>Doğum Tarihi:</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal auth-input",
                              !child.birthDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {child.birthDate ? (
                              format(child.birthDate, "dd.MM.yyyy")
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
                          <div className="p-3 space-y-3">
                            {/* Quick Year Selector for Children */}
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <Label className="text-xs text-muted-foreground mb-1 block">Yıl</Label>
                                <Select
                                  value={child.birthDate ? child.birthDate.getFullYear().toString() : ""}
                                  onValueChange={(year) => {
                                    const currentDate = child.birthDate || new Date();
                                    const newDate = new Date(parseInt(year), currentDate.getMonth(), currentDate.getDate());
                                    handleChildChange(child.id, 'birthDate', newDate);
                                  }}
                                >
                                  <SelectTrigger className="h-8 text-sm">
                                    <SelectValue placeholder="Yıl seç" />
                                  </SelectTrigger>
                                  <SelectContent className="max-h-[200px]">
                                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Calendar */}
                            <Calendar
                              mode="single"
                              selected={child.birthDate || undefined}
                              onSelect={(date) => handleChildChange(child.id, 'birthDate', date)}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              month={child.birthDate ? new Date(child.birthDate.getFullYear(), child.birthDate.getMonth()) : new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`gender-${child.id}`}>Cinsiyet:</Label>
                      <Select 
                        value={child.gender}
                        onValueChange={(value) => handleChildChange(child.id, 'gender', value)}
                      >
                        <SelectTrigger className="auth-input">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Erkek</SelectItem>
                          <SelectItem value="female">Kız</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addChild}
              className="w-full border-dashed border-2 border-gray-300 flex items-center justify-center gap-2 py-6"
            >
              <Plus className="h-4 w-4" />
              <span>Çocuk Ekle</span>
            </Button>
          </>
        )}

        {!hasChildren && (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Çocuk bilgisi eklemeyi seçmediniz. Kaydı tamamlamak için Kaydı Tamamla düğmesine tıklayın.</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default ChildInfoStep;
