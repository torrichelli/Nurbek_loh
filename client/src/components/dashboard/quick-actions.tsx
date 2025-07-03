import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calculator, Route, Package, FileText } from "lucide-react";
import { t } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";

export function QuickActions() {
  const { user } = useAuth();

  if (!user) return null;

  const roleActions = {
    admin: [
      { icon: Plus, label: t("newOrder"), className: "bg-blue-900 hover:bg-blue-800 text-white" },
      { icon: Calculator, label: t("calculateCost"), className: "bg-yellow-400 hover:bg-yellow-500 text-blue-900" },
      { icon: Route, label: "Бағыт жоспарлау", className: "border border-gray-300 hover:bg-gray-50" },
      { icon: FileText, label: "Есеп жасау", className: "border border-gray-300 hover:bg-gray-50" }
    ],
    manager: [
      { icon: Plus, label: t("newOrder"), className: "bg-blue-900 hover:bg-blue-800 text-white" },
      { icon: Calculator, label: t("calculateCost"), className: "bg-yellow-400 hover:bg-yellow-500 text-blue-900" },
      { icon: Route, label: "Бағыт жоспарлау", className: "border border-gray-300 hover:bg-gray-50" }
    ],
    driver: [
      { icon: Route, label: "Менің бағыттарым", className: "bg-green-600 hover:bg-green-700 text-white" },
      { icon: Package, label: "Тапсырысты жаңарту", className: "border border-gray-300 hover:bg-gray-50" }
    ],
    warehouse: [
      { icon: Package, label: "Тауар қабылдау", className: "bg-orange-600 hover:bg-orange-700 text-white" },
      { icon: Plus, label: "Қойма операциясы", className: "border border-gray-300 hover:bg-gray-50" }
    ]
  };

  const actions = roleActions[user.role as keyof typeof roleActions] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("quickActions")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              className={`w-full py-3 font-medium touch-target ${action.className}`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
