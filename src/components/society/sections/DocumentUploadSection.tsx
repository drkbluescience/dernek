import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Send, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";

interface DocumentUploadSectionProps {
  onUpload?: (data: DocumentUploadData) => Promise<void>;
}

interface DocumentUploadData {
  email: string;
  subject: string;
  message: string;
  file: File | null;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({ onUpload }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<DocumentUploadData>({
    email: "",
    subject: "",
    message: "",
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof DocumentUploadData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      file: null
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email.trim()) {
      toast({
        title: t("document.upload.error"),
        description: t("document.upload.email.required"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.subject.trim()) {
      toast({
        title: t("document.upload.error"),
        description: t("document.upload.subject.required"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.message.trim()) {
      toast({
        title: t("document.upload.error"),
        description: t("document.upload.message.required"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (onUpload) {
        await onUpload(formData);
      } else {
        // Default behavior - simulate upload
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      toast({
        title: t("document.upload.success"),
        description: t("document.upload.success.description"),
      });

      // Reset form
      setFormData({
        email: "",
        subject: "",
        message: "",
        file: null
      });

    } catch (error: any) {
      console.error("Document upload error:", error);
      toast({
        title: t("document.upload.error"),
        description: error.message || t("document.upload.error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("document.upload.email")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder={t("document.upload.email.placeholder")}
              className="w-full"
            />
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject">{t("document.upload.subject")}</Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder={t("document.upload.subject.placeholder")}
              className="w-full"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">{t("document.upload.message")}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder={t("document.upload.message.placeholder")}
              className="w-full min-h-[100px] resize-none"
              rows={4}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>{t("document.upload.file")}</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-society-purple transition-colors">
              {formData.file ? (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-society-purple" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{formData.file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(formData.file.size)}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">{t("document.upload.file.placeholder")}</p>
                  <Input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <Label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-society-purple text-white rounded-md hover:bg-purple-700 cursor-pointer transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    {t("document.upload.file.select")}
                  </Label>
                  <p className="text-xs text-gray-500 mt-2">
                    {t("document.upload.file.types")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-society-purple hover:bg-purple-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("document.upload.submitting")}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t("document.upload.submit")}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadSection;
