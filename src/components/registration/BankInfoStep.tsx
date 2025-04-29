
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface BankInfoStepProps {
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const BankInfoStep = ({ initialData, onSubmit }: BankInfoStepProps) => {
  const [formData, setFormData] = useState({
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

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptSepaMandate: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptSepaMandate) {
      alert("Lütfen SEPA-Lastschriftmandat'ı kabul ediniz.");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form id="form-bank" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h3 className="text-xl font-medium">SEPA-Lastschriftmandat (Otomatik Ödeme Talimatı)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="accountHolder">Hesap Sahibi:</Label>
            <Input
              id="accountHolder"
              value={formData.accountHolder}
              onChange={handleChange}
              placeholder="Tam ad"
              required
              className="auth-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Banka Adı:</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Banka adı"
              required
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
              required
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
              required
              className="auth-input"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg border">
          <p className="text-sm text-gray-700 mb-4">
            İşbu belge ile derneğimize, üyelik aidatını yukarıda belirttiğim hesaptan 
            SEPA otomatik ödeme talimatı ile tahsil etmesi için yetki veriyorum. 
            Aynı zamanda, bankama derneğimiz tarafından hesabıma borç kaydedilen 
            ödemeleri onaylama talimatı veriyorum.
          </p>
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="acceptSepaMandate" 
              checked={formData.acceptSepaMandate}
              onCheckedChange={handleCheckboxChange}
              className="mt-1"
            />
            <Label 
              htmlFor="acceptSepaMandate" 
              className="text-sm font-medium cursor-pointer"
            >
              SEPA otomatik ödeme talimatını kabul ediyorum
            </Label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BankInfoStep;
