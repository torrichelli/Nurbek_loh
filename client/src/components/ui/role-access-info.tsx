import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle } from "lucide-react";
import { getRoleDisplayName, getRolePermissions } from "../layout/role-based-navigation";

export function RoleAccessInfo() {
  const { user } = useAuth();

  if (!user) return null;

  const permissions = getRolePermissions(user.role);
  const roleColor = user.role === 'admin' ? 'bg-red-500' : 
                    user.role === 'manager' ? 'bg-blue-500' : 
                    user.role === 'driver' ? 'bg-green-500' : 'bg-orange-500';

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-gray-600" />
            <span>Қол жетімділік деңгейі</span>
          </CardTitle>
          <Badge className={`${roleColor} text-white`}>
            {getRoleDisplayName(user.role)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-3">
            Сіздің рөліңіз бойынша мүмкіндіктер:
          </p>
          {permissions.map((permission, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{permission}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}