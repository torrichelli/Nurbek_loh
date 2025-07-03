import { useAuth } from "@/hooks/use-auth";
import { 
  Home, 
  ShoppingCart, 
  Warehouse, 
  Route, 
  Calculator, 
  FileText, 
  BarChart3,
  Users,
  Settings,
  Package
} from "lucide-react";
import { t } from "@/lib/i18n";

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  count?: number;
  roles: string[];
}

const allNavigation: NavigationItem[] = [
  { 
    name: "dashboard", 
    href: "#", 
    icon: Home, 
    roles: ["admin", "manager", "driver", "warehouse"] 
  },
  { 
    name: "orders", 
    href: "#", 
    icon: ShoppingCart, 
    count: 12, 
    roles: ["admin", "manager", "driver", "warehouse"] 
  },
  { 
    name: "inventory", 
    href: "#", 
    icon: Warehouse, 
    roles: ["admin", "manager", "warehouse"] 
  },
  { 
    name: "routes", 
    href: "#", 
    icon: Route, 
    roles: ["admin", "manager", "driver"] 
  },
  { 
    name: "costCalculator", 
    href: "#", 
    icon: Calculator, 
    roles: ["admin", "manager"] 
  },
  { 
    name: "invoices", 
    href: "#", 
    icon: FileText, 
    roles: ["admin", "manager"] 
  },
  { 
    name: "reports", 
    href: "#", 
    icon: BarChart3, 
    roles: ["admin", "manager"] 
  },
  { 
    name: "users", 
    href: "#users", 
    icon: Users, 
    roles: ["admin"] 
  },
  { 
    name: "settings", 
    href: "#settings", 
    icon: Settings, 
    roles: ["admin"] 
  }
];

export function useRoleBasedNavigation() {
  const { user } = useAuth();
  
  if (!user) return [];

  return allNavigation.filter(item => 
    item.roles.includes(user.role)
  );
}

export function getRoleDisplayName(role: string): string {
  switch (role) {
    case "admin":
      return "Әкімші";
    case "manager":
      return "Менеджер";
    case "driver":
      return "Драйвер";
    case "warehouse":
      return "Қойма қызметкері";
    default:
      return role;
  }
}

export function getRolePermissions(role: string): string[] {
  switch (role) {
    case "admin":
      return [
        "Барлық деректерге қол жетім",
        "Пайдаланушыларды басқару",
        "Есептерді көру",
        "Жүйе баптауларын өзгерту"
      ];
    case "manager":
      return [
        "Тапсырыстарды басқару",
        "Қойма деректерін көру",
        "Есептерді жасау",
        "Құн калькуляторы"
      ];
    case "driver":
      return [
        "Тек өз тапсырыстарын көру",
        "Бағыттарды көру",
        "Статусты жаңарту"
      ];
    case "warehouse":
      return [
        "Қойма операцияларын басқару",
        "Тауар қорын көру",
        "Тауар қабылдау/беру"
      ];
    default:
      return [];
  }
}