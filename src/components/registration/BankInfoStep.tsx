
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/context/LanguageContext";

interface BankInfoStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const BankInfoStep = ({ initialData, onSubmit }: BankInfoStepProps) => {
  const { t } = useLanguage();
  const [provideBankInfo, setProvideBankInfo] = useState(initialData.provideBankInfo !== false);
  const [formData, setFormData] = useState({
    provideBankInfo: initialData.provideBankInfo !== false,
    accountHolder: initialData.accountHolder || "",
    bankName: initialData.bankName || "",
    iban: initialData.iban || "",
    bic: initialData.bic || "",
    acceptSepaMandate: initialData.acceptSepaMandate || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
    
    if (field === "provideBankInfo") {
      setProvideBankInfo(checked);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If providing bank info, ensure SEPA mandate is accepted
    if (formData.provideBankInfo && !formData.acceptSepaMandate) {
      alert(t("registration.bank.sepa.required"));
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form id="form-bank" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
          <p className="text-amber-800 text-sm">
            {t("registration.bank.optional.info")}
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Checkbox
            id="provideBankInfo"
            checked={provideBankInfo}
            onCheckedChange={(checked) => handleCheckboxChange("provideBankInfo", !!checked)}
          />
          <Label
            htmlFor="provideBankInfo"
            className="text-sm font-medium cursor-pointer"
          >
            {t("registration.bank.provide.info")}
          </Label>
        </div>

        {provideBankInfo ? (
          <>
            <h3 className="text-xl font-medium">SEPA-Lastschriftmandat (Otomatik Ödeme Talimatı)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountHolder">{t("registration.bank.accountHolder")}:</Label>
                <Input
                  id="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  placeholder={t("registration.bank.accountHolder.placeholder")}
                  required={provideBankInfo}
                  className="auth-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">{t("registration.bank.bankName")}:</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder={t("registration.bank.bankName.placeholder")}
                  required={provideBankInfo}
                  className="auth-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="iban">IBAN:</Label>
                <Input
                  id="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  placeholder="DE00 0000 0000 0000 0000 00"
                  required={provideBankInfo}
                  className="auth-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bic">BIC:</Label>
                <Input
                  id="bic"
                  value={formData.bic}
                  onChange={handleChange}
                  placeholder="XXXXXXXX"
                  required={provideBankInfo}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg border">
              <p className="text-sm text-gray-700 mb-4">
                {t("registration.bank.sepa.mandate.text")}
              </p>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptSepaMandate"
                  checked={formData.acceptSepaMandate}
                  onCheckedChange={(checked) => handleCheckboxChange("acceptSepaMandate", !!checked)}
                  className="mt-1"
                />
                <Label
                  htmlFor="acceptSepaMandate"
                  className="text-sm font-medium cursor-pointer"
                >
                  {t("registration.bank.sepa.mandate.accept")}
                </Label>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">{t("registration.bank.no.info.message")}</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default BankInfoStep;
