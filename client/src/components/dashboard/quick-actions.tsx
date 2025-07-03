import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calculator, Route } from "lucide-react";
import { t } from "@/lib/i18n";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("quickActions")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 font-medium touch-target">
          <Plus className="mr-2 h-4 w-4" />
          {t("newOrder")}
        </Button>
        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-3 font-medium touch-target">
          <Calculator className="mr-2 h-4 w-4" />
          {t("calculateCost")}
        </Button>
        <Button variant="outline" className="w-full py-3 font-medium touch-target">
          <Route className="mr-2 h-4 w-4" />
          Бағыт жоспарлау
        </Button>
      </CardContent>
    </Card>
  );
}
