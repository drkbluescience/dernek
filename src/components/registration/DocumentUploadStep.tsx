
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DocumentUploadStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const DocumentUploadStep = ({ initialData, onSubmit }: DocumentUploadStepProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    idDocument: initialData.idDocument || null,
    idDocumentName: initialData.idDocumentName || ""
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(t("registration.documents.file.size.error"));
        return;
      }

      if (!['application/pdf', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        alert(t("registration.documents.file.type.error"));
        return;
      }
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
      
      setFormData({
        idDocument: file,
        idDocumentName: file.name
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would upload the file to a server here
    // For now, we'll just pass the file name to the next step
    onSubmit({
      idDocumentName: formData.idDocumentName,
      // We don't pass the actual file through the form data to avoid serialization issues
      // In a real app, you'd upload it directly or use FormData
    });
  };

  return (
    <form id="form-documents" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="block mb-2">{t("registration.documents.id.upload")}</Label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="idDocument"
              accept=".pdf,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="space-y-4">
                <img 
                  src={previewUrl} 
                  alt="Document preview" 
                  className="mx-auto max-h-40 object-contain"
                />
                <p className="text-sm text-gray-500 truncate">{formData.idDocumentName}</p>
                <Label
                  htmlFor="idDocument"
                  className="cursor-pointer inline-block"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                  >
                    {t("registration.documents.file.change")}
                  </Button>
                </Label>
              </div>
            ) : (
              <Label
                htmlFor="idDocument"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-society-purple font-medium text-lg">{t("registration.documents.file.select")}</span>
                <p className="text-sm text-gray-500 mt-1">{t("registration.documents.file.drag")}</p>
                <p className="text-xs text-gray-400 mt-4">{t("registration.documents.file.size.limit")}</p>
                <p className="text-xs text-gray-400">Desteklenen formatlar: PDF ve JPG</p>
              </Label>
            )}
          </div>
          
          {formData.idDocumentName && !previewUrl && (
            <p className="text-sm mt-2">
              Seçili dosya: <span className="font-medium">{formData.idDocumentName}</span>
            </p>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-700">Önemli Bilgi</h4>
          <p className="text-sm text-blue-600 mt-1">
            Kimlik belgesi yüklemeniz, dernek üyeliğinizin onaylanması için gereklidir.
            Lütfen geçerli bir kimlik belgesi (nüfus cüzdanı, ehliyet, pasaport vb.) yükleyin.
          </p>
        </div>
      </div>
    </form>
  );
};

export default DocumentUploadStep;
