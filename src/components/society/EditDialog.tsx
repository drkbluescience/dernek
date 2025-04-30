
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

interface EditDialogProps {
  editField: string;
  editValue: string;
  setEditValue: (value: string) => void;
  setEditField: (field: string) => void;
  handleSave: () => void;
}

const EditDialog = ({ 
  editField, 
  editValue, 
  setEditValue, 
  setEditField, 
  handleSave 
}: EditDialogProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={!!editField} onOpenChange={(open) => !open && setEditField("")}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("society.edit.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setEditField("")}>
            {t("society.edit.cancel")}
          </Button>
          <Button onClick={handleSave}>
            {t("society.edit.save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
