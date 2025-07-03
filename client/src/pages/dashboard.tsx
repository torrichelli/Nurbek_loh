import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { SystemAlerts } from "@/components/dashboard/system-alerts";
import { TaxCalculator } from "@/components/dashboard/tax-calculator";
import { RoleAccessInfo } from "@/components/ui/role-access-info";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Bell } from "lucide-react";
import { t } from "@/lib/i18n";
import { getRoleDisplayName } from "@/components/layout/role-based-navigation";

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header - Desktop Only */}
        <header className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("dashboard")}</h1>
              <p className="text-sm text-gray-600">Логистика операцияларын басқару панелі</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</p>
                </div>
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6">
          {/* Role Access Info */}
          <RoleAccessInfo />
          
          {/* Stats Cards */}
          <StatsCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <RecentOrders />
            </div>

            {/* Quick Actions & Alerts */}
            <div className="space-y-6">
              <QuickActions />
              <SystemAlerts />
              <TaxCalculator />
            </div>
          </div>

          {/* Mobile Bottom Navigation Spacer */}
          <div className="h-20 lg:h-0"></div>
        </main>
      </div>
    </div>
  );
}
