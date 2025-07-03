import { Request, Response, NextFunction } from "express";
import { User } from "@shared/schema";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Авторизация қажет" });
  }
  next();
}

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "Авторизация қажет" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Қол жетімсіз. Жеткіліксіз құқықтар" });
    }

    next();
  };
}

export function requireAdminOrManager(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Авторизация қажет" });
  }

  if (!['admin', 'manager'].includes(req.user.role)) {
    return res.status(403).json({ message: "Тек әкімші немесе менеджер қол жеткізе алады" });
  }

  next();
}

export function canAccessOrders(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Авторизация қажет" });
  }

  // Админ и менеджер видят все заказы
  // Драйвер видит только свои назначенные заказы
  // Склад видит заказы связанные с операциями склада
  if (['admin', 'manager', 'driver', 'warehouse'].includes(req.user.role)) {
    next();
  } else {
    return res.status(403).json({ message: "Тапсырыстарға қол жетімсіз" });
  }
}

export function canManageInventory(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Авторизация қажет" });
  }

  // Админ, менеджер и склад могут управлять инвентарем
  if (['admin', 'manager', 'warehouse'].includes(req.user.role)) {
    next();
  } else {
    return res.status(403).json({ message: "Қойма басқаруға қол жетімсіз" });
  }
}

export function canManageRoutes(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Авторизация қажет" });
  }

  // Админ, менеджер и водители могут работать с маршрутами
  if (['admin', 'manager', 'driver'].includes(req.user.role)) {
    next();
  } else {
    return res.status(403).json({ message: "Бағыт басқаруға қол жетімсіз" });
  }
}