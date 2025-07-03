import { users, orders, customers, inventory, routes, vehicles, warehouseOperations, invoices, type User, type InsertUser, type Order, type Customer } from "@shared/schema";
import { db, pool } from "./db";
import { eq, desc, count, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Dashboard stats
  getDashboardStats(): Promise<{
    activeOrders: number;
    totalRevenue: string;
    activeDrivers: number;
    warehouseCapacity: number;
  }>;
  
  // Orders
  getRecentOrders(limit?: number): Promise<(Order & { customer: Customer })[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getDashboardStats() {
    // Get active orders count
    const [activeOrdersResult] = await db
      .select({ count: count() })
      .from(orders)
      .where(eq(orders.status, "in_transit"));
    
    // Get total revenue from completed orders
    const revenueResult = await db
      .select()
      .from(orders)
      .where(eq(orders.status, "delivered"));
    
    const totalRevenue = revenueResult.reduce((sum, order) => {
      return sum + parseFloat(order.totalAmount);
    }, 0);

    // Get active drivers count
    const [activeDriversResult] = await db
      .select({ count: count() })
      .from(users)
      .where(and(eq(users.role, "driver"), eq(users.isActive, true)));

    // Get warehouse capacity (simplified calculation)
    const inventoryItems = await db.select().from(inventory);
    const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
    const maxCapacity = 10000; // Arbitrary max capacity
    const warehouseCapacity = Math.round((totalItems / maxCapacity) * 100);

    return {
      activeOrders: activeOrdersResult.count,
      totalRevenue: totalRevenue.toFixed(2),
      activeDrivers: activeDriversResult.count,
      warehouseCapacity: Math.min(warehouseCapacity, 100),
    };
  }

  async getRecentOrders(limit = 10): Promise<(Order & { customer: Customer })[]> {
    const result = await db
      .select()
      .from(orders)
      .leftJoin(customers, eq(orders.customerId, customers.id))
      .orderBy(desc(orders.createdAt))
      .limit(limit);

    return result.map(row => ({
      ...row.orders,
      customer: row.customers!,
    }));
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }
}

export const storage = new DatabaseStorage();
