import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ShoppingCart, Users, Warehouse } from "lucide-react";
import { t } from "@/lib/i18n";

interface DashboardStats {
  activeOrders: number;
  totalRevenue: string;
  activeDrivers: number;
  warehouseCapacity: number;
}

export function StatsCards() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            Деректер жүктелмеді
          </CardContent>
        </Card>
      </div>
    );
  }

  const cards = [
    {
      title: t("activeOrders"),
      value: stats.activeOrders.toString(),
      change: "+12% осы аптада",
      icon: ShoppingCart,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-green-600",
    },
    {
      title: t("totalRevenue"),
      value: `${parseFloat(stats.totalRevenue).toLocaleString('kk-KZ')}₸`,
      change: "+8% осы айда",
      icon: TrendingUp,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      changeColor: "text-green-600",
    },
    {
      title: t("activeDrivers"),
      value: stats.activeDrivers.toString(),
      change: "жолда",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-blue-600",
    },
    {
      title: t("warehouseCapacity"),
      value: `${stats.warehouseCapacity}%`,
      change: `${100 - stats.warehouseCapacity}% бос`,
      icon: Warehouse,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      changeColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className={`text-sm mt-1 ${card.changeColor}`}>
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    {card.change}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
