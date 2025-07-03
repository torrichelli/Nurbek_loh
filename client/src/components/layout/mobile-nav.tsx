import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { 
  Truck, 
  Menu, 
  X, 
  Home, 
  ShoppingCart, 
  Warehouse, 
  Route, 
  Calculator,
  Plus,
  User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { t } from "@/lib/i18n";

const navigation = [
  { name: "dashboard", href: "#", icon: Home },
  { name: "orders", href: "#", icon: ShoppingCart },
  { name: "inventory", href: "#", icon: Warehouse },
  { name: "routes", href: "#", icon: Route },
  { name: "costCalculator", href: "#", icon: Calculator },
];

const bottomNavigation = [
  { name: "dashboard", href: "#", icon: Home, current: true },
  { name: "orders", href: "#", icon: ShoppingCart },
  { name: "add", href: "#", icon: Plus },
  { name: "routes", href: "#", icon: Route },
  { name: "profile", href: "#", icon: User },
];

export function MobileNav() {
  const { user, logoutMutation } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Top Mobile Navigation */}
      <nav className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <Truck className="text-white text-sm" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">ЛогистикаПро</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <LanguageToggle />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 touch-target"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Мәзір</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 touch-target"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </div>
            
            {/* Mobile Menu Items */}
            <div className="p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 touch-target"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-blue-900" />
                    <span>{t(item.name as any)}</span>
                  </a>
                );
              })}
            </div>

            {/* User Profile Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{t(user.role as any)}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  logoutMutation.mutate();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium touch-target"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Шығу
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-2 px-1 text-xs touch-target ${
                  item.current
                    ? "text-blue-900 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">
                  {item.name === "add" ? "Қосу" : 
                   item.name === "profile" ? "Профиль" : 
                   t(item.name as any)}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
