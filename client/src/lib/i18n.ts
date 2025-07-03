export const translations = {
  kk: {
    // Authentication
    login: "Кіру",
    register: "Тіркелу",
    username: "Пайдаланушы аты",
    email: "Электрондық пошта",
    password: "Құпия сөз",
    confirmPassword: "Құпия сөзді растау",
    firstName: "Аты",
    lastName: "Тегі",
    phone: "Телефон",
    role: "Рөлі",
    rememberMe: "Мені есте сақта",
    forgotPassword: "Құпия сөзді ұмыттыңыз ба?",
    
    // Roles
    admin: "Әкімші",
    manager: "Менеджер",
    driver: "Драйвер",
    warehouse: "Қойма қызметкері",
    
    // Navigation
    dashboard: "Басты бет",
    orders: "Тапсырыстар",
    inventory: "Қойма",
    routes: "Бағыттар",
    costCalculator: "Құн калькуляторы",
    invoices: "Шот-фактуралар",
    reports: "Есептер",
    
    // Dashboard
    activeOrders: "Белсенді тапсырыстар",
    totalRevenue: "Жалпы кіріс",
    activeDrivers: "Белсенді драйверлер",
    warehouseCapacity: "Қойма толығы",
    recentOrders: "Соңғы тапсырыстар",
    quickActions: "Жылдам әрекеттер",
    alerts: "Ескертулер",
    
    // Actions
    newOrder: "Жаңа тапсырыс",
    calculateCost: "Құн есептеу",
    planRoute: "Бағыт жоспарлау",
    viewAll: "Барлығын көру",
    
    // Status
    pending: "Күтуде",
    processing: "Өңделуде",
    inTransit: "Жолда",
    delivered: "Жеткізілді",
    cancelled: "Болдырылмады",
    
    // Common
    actions: "Әрекеттер",
    customer: "Тапсырыс беруші",
    amount: "Сома",
    status: "Мәртебесі",
    orderNumber: "Тапсырыс №",
    currency: "₸",
    
    // Tax calculator
    vatCalculator: "КДВ калькуляторы",
    subtotal: "Жалпы сома",
    vat: "КДВ (12%)",
    total: "Қорытынды",
  },
  ru: {
    // Authentication
    login: "Войти",
    register: "Регистрация",
    username: "Имя пользователя",
    email: "Электронная почта",
    password: "Пароль",
    confirmPassword: "Подтвердить пароль",
    firstName: "Имя",
    lastName: "Фамилия",
    phone: "Телефон",
    role: "Роль",
    rememberMe: "Запомнить меня",
    forgotPassword: "Забыли пароль?",
    
    // Roles
    admin: "Администратор",
    manager: "Менеджер", 
    driver: "Водитель",
    warehouse: "Сотрудник склада",
    
    // Navigation
    dashboard: "Главная",
    orders: "Заказы",
    inventory: "Склад",
    routes: "Маршруты",
    costCalculator: "Калькулятор стоимости",
    invoices: "Счета-фактуры",
    reports: "Отчеты",
    
    // Dashboard
    activeOrders: "Активные заказы",
    totalRevenue: "Общий доход",
    activeDrivers: "Активные водители",
    warehouseCapacity: "Заполненность склада",
    recentOrders: "Последние заказы",
    quickActions: "Быстрые действия",
    alerts: "Уведомления",
    
    // Actions
    newOrder: "Новый заказ",
    calculateCost: "Расчет стоимости",
    planRoute: "Планирование маршрута",
    viewAll: "Показать все",
    
    // Status
    pending: "Ожидание",
    processing: "Обработка",
    inTransit: "В пути",
    delivered: "Доставлено",
    cancelled: "Отменено",
    
    // Common
    actions: "Действия",
    customer: "Заказчик",
    amount: "Сумма",
    status: "Статус",
    orderNumber: "Заказ №",
    currency: "₸",
    
    // Tax calculator
    vatCalculator: "НДС калькулятор",
    subtotal: "Общая сумма",
    vat: "НДС (12%)",
    total: "Итого",
  },
};

export type Language = keyof typeof translations;

let currentLanguage: Language = "kk";

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
}

export function getLanguage(): Language {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("language") as Language;
    if (stored && translations[stored]) {
      currentLanguage = stored;
    }
  }
  return currentLanguage;
}

export function t(key: keyof typeof translations.kk): string {
  const lang = getLanguage();
  return translations[lang][key] || translations.kk[key] || key;
}
