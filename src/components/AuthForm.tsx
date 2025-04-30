
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

interface AuthFormProps {
  title: string;
  fields: FormField[];
  submitText: string;
  onSubmit: (data: Record<string, string>) => void;
  footerText?: string;
  footerLinkText?: string;
  footerLinkUrl?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  submitText,
  onSubmit,
  footerText,
  footerLinkText,
  footerLinkUrl,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-center mb-6 text-society-dark-text">
        {title}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-medium text-society-dark-text">
              {field.label}
            </label>
            <div className="relative">
              <Input
                id={field.id}
                type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
                placeholder={field.placeholder}
                required={field.required !== false}
                className="auth-input pr-10"
                onChange={handleChange}
              />
              {field.type === "password" && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
        <Button type="submit" className="auth-button mt-6 w-full">
          {submitText}
        </Button>
      </form>
      {footerText && footerLinkText && footerLinkUrl && (
        <p className="text-center mt-6 text-society-neutral-gray">
          {footerText}{" "}
          <Link to={footerLinkUrl} className="auth-link">
            {footerLinkText}
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
