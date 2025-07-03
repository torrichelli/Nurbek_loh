import { useAuth } from "@/hooks/use-auth";
import { 
  Truck, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { useRoleBasedNavigation, getRoleDisplayName } from "./role-based-navigation";

export function Sidebar() {
  const { user, logoutMutation } = useAuth();
  const navigation = useRoleBasedNavigation();

  if (!user) return null;

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-white shadow-lg">
        {/* Sidebar Header */}
        <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <Truck className="text-white text-sm" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">ЛогистикаПро</h1>
          </div>
        </div>

        {/* Role Badge */}
        <div className="px-4 py-2 bg-blue-50 border-b border-gray-200">
          <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">
            {getRoleDisplayName(user.role)}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item: any, index: number) => {
            const Icon = item.icon;
            const isCurrent = index === 0; // Dashboard is current for demo
            return (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  isCurrent
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {t(item.name as any)}
                {item.count && (
                  <span className="ml-auto bg-yellow-400 text-blue-900 px-2 py-1 text-xs rounded-full font-medium">
                    {item.count}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
