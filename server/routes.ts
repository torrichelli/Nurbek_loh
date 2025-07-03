import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { requireAuth, requireRole, requireAdminOrManager, canAccessOrders, canManageInventory, canManageRoutes } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Dashboard API routes - доступны всем авторизованным пользователям
  app.get("/api/dashboard/stats", requireAuth, async (req, res, next) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  });

  // Orders API routes - с ролевым доступом
  app.get("/api/orders/recent", requireAuth, canAccessOrders, async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const user = req.user!;
      
      // Передаем информацию о пользователе для фильтрации заказов
      const orders = await storage.getRecentOrders(limit, user.id, user.role);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  // Заказы конкретного пользователя (для драйверов)
  app.get("/api/orders/my", requireAuth, requireRole(['driver']), async (req, res, next) => {
    try {
      const user = req.user!;
      const orders = await storage.getUserOrders(user.id);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  // Все заказы (только для админа и менеджера)
  app.get("/api/orders/all", requireAuth, requireAdminOrManager, async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const orders = await storage.getRecentOrders(limit);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  // Инвентарь API - только админ, менеджер и склад
  app.get("/api/inventory", requireAuth, canManageInventory, async (req, res, next) => {
    try {
      // Здесь будет логика получения инвентаря
      res.json([]);
    } catch (error) {
      next(error);
    }
  });

  // Маршруты API - админ, менеджер и драйверы
  app.get("/api/routes", requireAuth, canManageRoutes, async (req, res, next) => {
    try {
      // Здесь будет логика получения маршрутов
      res.json([]);
    } catch (error) {
      next(error);
    }
  });

  // Пользователи API - только админ
  app.get("/api/users", requireAuth, requireRole(['admin']), async (req, res, next) => {
    try {
      // Здесь будет логика получения списка пользователей
      res.json([]);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
