import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { t } from "@/lib/i18n";

const alerts = [
  {
    type: "warning",
    title: "Қойма толып бара жатыр",
    description: "Алматы қоймасы 90% толған",
    icon: AlertTriangle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-600",
    textColor: "text-yellow-800",
  },
  {
    type: "error",
    title: "Кідіріс бар тапсырыс",
    description: "Тапсырыс #KZ-2024-089 кідіріп тұр",
    icon: AlertCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    textColor: "text-red-800",
  },
  {
    type: "info",
    title: "Жаңа драйвер тіркелді",
    description: "Ерлан Сериков жүйеге қосылды",
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    textColor: "text-blue-800",
  },
];

export function SystemAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("alerts")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`flex items-start space-x-3 p-3 ${alert.bgColor} border ${alert.borderColor} rounded-lg`}
            >
              <Icon className={`${alert.iconColor} h-5 w-5 mt-0.5 flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${alert.textColor}`}>
                  {alert.title}
                </p>
                <p className={`text-xs mt-1 ${alert.textColor} opacity-80`}>
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
