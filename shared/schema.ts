import { pgTable, text, serial, integer, boolean, timestamp, decimal, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table with role-based access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull().default("driver"), // admin, manager, driver, warehouse
  phone: text("phone"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerId: integer("customer_id").references(() => customers.id),
  status: text("status").notNull().default("pending"), // pending, processing, in_transit, delivered, cancelled
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("KZT"),
  priority: text("priority").notNull().default("normal"), // low, normal, high, urgent
  pickupAddress: text("pickup_address").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  pickupCity: text("pickup_city").notNull(),
  deliveryCity: text("delivery_city").notNull(),
  assignedDriverId: integer("assigned_driver_id").references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Customers table
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code"),
  bin: text("bin"), // Kazakhstan Business Identification Number
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Inventory table
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  itemName: text("item_name").notNull(),
  sku: text("sku").notNull().unique(),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull().default(0),
  unit: text("unit").notNull().default("pcs"),
  weight: decimal("weight", { precision: 8, scale: 2 }),
  dimensions: text("dimensions"),
  warehouseLocation: text("warehouse_location"),
  minStockLevel: integer("min_stock_level").notNull().default(10),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Routes table
export const routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  routeName: text("route_name").notNull(),
  startLocation: text("start_location").notNull(),
  endLocation: text("end_location").notNull(),
  distance: decimal("distance", { precision: 8, scale: 2 }).notNull(), // in kilometers
  estimatedDuration: integer("estimated_duration").notNull(), // in minutes
  driverId: integer("driver_id").references(() => users.id),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  status: text("status").notNull().default("planned"), // planned, active, completed, cancelled
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  fuelCost: decimal("fuel_cost", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  plateNumber: text("plate_number").notNull().unique(),
  model: text("model").notNull(),
  type: text("type").notNull(), // truck, van, motorcycle
  capacity: decimal("capacity", { precision: 8, scale: 2 }).notNull(), // in kg
  fuelType: text("fuel_type").notNull().default("diesel"),
  fuelConsumption: decimal("fuel_consumption", { precision: 5, scale: 2 }), // L/100km
  isActive: boolean("is_active").notNull().default(true),
  assignedDriverId: integer("assigned_driver_id").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Warehouse Operations table
export const warehouseOperations = pgTable("warehouse_operations", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // inbound, outbound, transfer, adjustment
  inventoryId: integer("inventory_id").references(() => inventory.id),
  quantity: integer("quantity").notNull(),
  operatorId: integer("operator_id").references(() => users.id),
  orderId: integer("order_id").references(() => orders.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Invoices table
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  orderId: integer("order_id").references(() => orders.id),
  customerId: integer("customer_id").references(() => customers.id),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  vatAmount: decimal("vat_amount", { precision: 10, scale: 2 }).notNull(), // Kazakhstan VAT 12%
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("draft"), // draft, sent, paid, overdue, cancelled
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  assignedOrders: many(orders),
  assignedRoutes: many(routes),
  assignedVehicle: many(vehicles),
  warehouseOperations: many(warehouseOperations),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  assignedDriver: one(users, {
    fields: [orders.assignedDriverId],
    references: [users.id],
  }),
  invoice: one(invoices),
  warehouseOperations: many(warehouseOperations),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
  invoices: many(invoices),
}));

export const inventoryRelations = relations(inventory, ({ many }) => ({
  warehouseOperations: many(warehouseOperations),
}));

export const routesRelations = relations(routes, ({ one }) => ({
  driver: one(users, {
    fields: [routes.driverId],
    references: [users.id],
  }),
  vehicle: one(vehicles, {
    fields: [routes.vehicleId],
    references: [vehicles.id],
  }),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  assignedDriver: one(users, {
    fields: [vehicles.assignedDriverId],
    references: [users.id],
  }),
  routes: many(routes),
}));

export const warehouseOperationsRelations = relations(warehouseOperations, ({ one }) => ({
  inventory: one(inventory, {
    fields: [warehouseOperations.inventoryId],
    references: [inventory.id],
  }),
  operator: one(users, {
    fields: [warehouseOperations.operatorId],
    references: [users.id],
  }),
  order: one(orders, {
    fields: [warehouseOperations.orderId],
    references: [orders.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  order: one(orders, {
    fields: [invoices.orderId],
    references: [orders.id],
  }),
  customer: one(customers, {
    fields: [invoices.customerId],
    references: [customers.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true,
});

export const insertInventorySchema = createInsertSchema(inventory).omit({
  id: true,
  createdAt: true,
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
  createdAt: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
});

export const insertWarehouseOperationSchema = createInsertSchema(warehouseOperations).omit({
  id: true,
  createdAt: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Inventory = typeof inventory.$inferSelect;
export type InsertInventory = z.infer<typeof insertInventorySchema>;
export type Route = typeof routes.$inferSelect;
export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type WarehouseOperation = typeof warehouseOperations.$inferSelect;
export type InsertWarehouseOperation = z.infer<typeof insertWarehouseOperationSchema>;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
