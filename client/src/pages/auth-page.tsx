import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Truck, Shield, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { t } from "@/lib/i18n";

const loginSchema = z.object({
  username: z.string().min(1, "Пайдаланушы аты қажет"),
  password: z.string().min(1, "Құпия сөз қажет"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Пайдаланушы аты кемінде 3 таңба болуы қажет"),
  email: z.string().email("Жарамды электрондық пошта енгізіңіз"),
  password: z.string().min(6, "Құпия сөз кемінде 6 таңба болуы қажет"),
  confirmPassword: z.string(),
  firstName: z.string().min(1, "Аты қажет"),
  lastName: z.string().min(1, "Тегі қажет"),
  role: z.enum(["admin", "manager", "driver", "warehouse"]),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Құпия сөздер сәйкес келмейді",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: "driver",
      phone: "",
    },
  });

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 relative overflow-hidden">
      {/* Kazakhstan pattern background */}
      <div className="absolute inset-0 kz-pattern"></div>
      
      {/* Top navigation with language toggle */}
      <nav className="relative z-10 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Truck className="text-blue-900 text-lg" />
          </div>
          <h1 className="text-white text-xl font-bold">ЛогистикаПро</h1>
        </div>
        
        <LanguageToggle />
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-5xl flex items-center justify-center lg:justify-between">
          {/* Hero Section - Hidden on mobile */}
          <div className="hidden lg:block w-1/2 pr-12">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Қазақстан үшін логистика шешімі
              </h2>
              <p className="text-lg mb-8 text-blue-100">
                Заманауи технологиялармен жабдықталған кешенді логистика басқару жүйесі. 
                Тапсырыстар, қойма, жеткізу және есеп-кітапты бір жерден басқарыңыз.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-blue-900 text-sm"></i>
                  </div>
                  <span>Тенге валютасымен толық интеграция</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-blue-900 text-sm"></i>
                  </div>
                  <span>Қазақ және орыс тілдерінде қолжетімді</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-blue-900 text-sm"></i>
                  </div>
                  <span>КДВ есептеуі мен салық басқаруы</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-blue-900 text-sm"></i>
                  </div>
                  <span>Мобильді құрылғыларға оңтайландырылған</span>
                </div>
              </div>
            </div>
          </div>

          {/* Login/Register Form */}
          <div className="w-full lg:w-1/2 max-w-md">
            <Card className="shadow-2xl fade-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Shield className="text-white text-2xl" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? t("login") : t("register")}
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  {isLogin ? "Логистика басқару жүйесіне кіру" : "Жаңа аккаунт жасау"}
                </p>
              </CardHeader>

              <CardContent>
                {isLogin ? (
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="username">{t("username")}</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="example@logistics.kz"
                        {...loginForm.register("username")}
                        className="touch-target"
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-red-600 mt-1">
                          {loginForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="password">{t("password")}</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...loginForm.register("password")}
                          className="touch-target pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-600 mt-1">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm">
                          {t("rememberMe")}
                        </Label>
                      </div>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        {t("forgotPassword")}
                      </a>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 touch-target"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Кіруде...</span>
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt mr-2"></i>
                          {t("login")}
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Аккаунтыңыз жоқ па?{" "}
                        <button
                          type="button"
                          onClick={() => setIsLogin(false)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {t("register")}
                        </button>
                      </p>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{t("firstName")}</Label>
                        <Input
                          id="firstName"
                          type="text"
                          {...registerForm.register("firstName")}
                          className="touch-target"
                        />
                        {registerForm.formState.errors.firstName && (
                          <p className="text-sm text-red-600 mt-1">
                            {registerForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t("lastName")}</Label>
                        <Input
                          id="lastName"
                          type="text"
                          {...registerForm.register("lastName")}
                          className="touch-target"
                        />
                        {registerForm.formState.errors.lastName && (
                          <p className="text-sm text-red-600 mt-1">
                            {registerForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="regUsername">{t("username")}</Label>
                      <Input
                        id="regUsername"
                        type="text"
                        {...registerForm.register("username")}
                        className="touch-target"
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="regEmail">{t("email")}</Label>
                      <Input
                        id="regEmail"
                        type="email"
                        {...registerForm.register("email")}
                        className="touch-target"
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="role">{t("role")}</Label>
                      <Select
                        value={registerForm.watch("role")}
                        onValueChange={(value) => registerForm.setValue("role", value as any)}
                      >
                        <SelectTrigger className="touch-target">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="driver">{t("driver")}</SelectItem>
                          <SelectItem value="warehouse">{t("warehouse")}</SelectItem>
                          <SelectItem value="manager">{t("manager")}</SelectItem>
                          <SelectItem value="admin">{t("admin")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="phone">{t("phone")} (міндетті емес)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (700) 123-45-67"
                        {...registerForm.register("phone")}
                        className="touch-target"
                      />
                    </div>

                    <div>
                      <Label htmlFor="regPassword">{t("password")}</Label>
                      <Input
                        id="regPassword"
                        type="password"
                        {...registerForm.register("password")}
                        className="touch-target"
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...registerForm.register("confirmPassword")}
                        className="touch-target"
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 touch-target"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Тіркелуде...</span>
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-user-plus mr-2"></i>
                          {t("register")}
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Аккаунтыңыз бар ма?{" "}
                        <button
                          type="button"
                          onClick={() => setIsLogin(true)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {t("login")}
                        </button>
                      </p>
                    </div>
                  </form>
                )}

                {/* Role Selection Hint */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-900 font-medium mb-2">Рөлдер:</p>
                  <div className="text-xs text-blue-700 space-y-1">
                    <div>• {t("admin")} - Толық қатынау</div>
                    <div>• {t("manager")} - Тапсырыстар мен есептер</div>
                    <div>• {t("driver")} - Жеткізу бағыттары</div>
                    <div>• {t("warehouse")} - Қойма операциялары</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8 text-white/70 text-sm">
              <p>© 2024 ЛогистикаПро. Қазақстан үшін жасалған.</p>
              <p className="mt-1">Тех. қолдау: +7 (727) 123-45-67</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
