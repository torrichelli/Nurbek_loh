import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { t } from "@/lib/i18n";

export function TaxCalculator() {
  const [amount, setAmount] = useState<number>(0);
  
  const vat = amount * 0.12; // Kazakhstan VAT rate 12%
  const total = amount + vat;

  return (
    <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <CardHeader>
        <CardTitle className="text-white">{t("vatCalculator")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-100">{t("subtotal")}:</span>
          <div className="flex items-center">
            <Input
              type="number"
              placeholder="0"
              value={amount || ""}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50 w-24 text-sm"
            />
            <span className="ml-2 text-sm">₸</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-100">{t("vat")}:</span>
          <span className="font-medium">
            {vat.toLocaleString('kk-KZ')}₸
          </span>
        </div>
        
        <div className="flex justify-between items-center border-t border-white/20 pt-3">
          <span className="font-medium">{t("total")}:</span>
          <span className="text-lg font-bold">
            {total.toLocaleString('kk-KZ')}₸
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
