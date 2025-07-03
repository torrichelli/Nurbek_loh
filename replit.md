# replit.md

## Overview

This is a full-stack logistics management application built for Kazakhstan markets. The application provides comprehensive logistics operations management including orders, inventory, routes, and cost calculation. It features a modern React frontend with TypeScript and a Node.js backend using Express, with PostgreSQL as the database.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Shadcn/UI component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for dynamic theming
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Management**: React Hook Form with Zod schema validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Authentication**: Passport.js with local strategy for user authentication
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **Development**: TSX for TypeScript execution in development mode

### Data Layer
- **Database**: PostgreSQL with Neon serverless driver for cloud deployment
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Type Safety**: Drizzle-Zod integration for runtime validation and type inference
- **Connection Pooling**: Built-in connection pooling via Neon's serverless driver

## Key Components

### Core Business Entities
1. **Users**: Role-based user management (admin, manager, driver, warehouse)
2. **Orders**: Customer order management with status tracking and delivery information
3. **Customers**: Customer database with company information and contact details
4. **Inventory**: Product catalog and stock management
5. **Routes**: Delivery route planning and optimization
6. **Vehicles**: Fleet management for delivery operations
7. **Warehouse Operations**: Stock movement tracking and warehouse management
8. **Invoices**: Billing and payment management

### Frontend Components
- **Dashboard**: Real-time statistics and KPI visualization
- **Authentication**: Login/register forms with role-based access
- **Mobile Navigation**: Responsive navigation with bottom tab bar for mobile
- **Internationalization**: Kazakh and Russian language support
- **Cost Calculator**: Real-time delivery cost estimation with VAT calculation

## Data Flow

1. **Client Requests**: React components use TanStack Query hooks to fetch data from REST API endpoints
2. **Authentication**: Passport.js middleware validates user sessions and enforces role-based access control
3. **API Layer**: Express routes handle HTTP requests and validate input using Zod schemas
4. **Data Access**: Storage layer abstracts database operations using Drizzle ORM with typed queries
5. **Database**: PostgreSQL stores all application data with proper relationships and constraints
6. **Real-time Updates**: TanStack Query automatically refetches data and updates UI when mutations occur

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for cloud deployment
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web framework for API endpoints
- **passport**: Authentication middleware
- **@tanstack/react-query**: Data fetching and caching library
- **react-hook-form**: Form management with validation
- **zod**: Schema validation library

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **wouter**: Lightweight routing library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development
- **Frontend**: Vite development server with HMR and error overlay
- **Backend**: TSX for TypeScript execution with automatic reloading
- **Database**: Local or cloud PostgreSQL instance via DATABASE_URL

### Production
- **Build Process**: 
  - Frontend: Vite builds optimized static assets
  - Backend: ESBuild bundles Node.js application
- **Deployment**: Single deployment with static files served by Express
- **Database**: PostgreSQL with connection pooling via Neon serverless
- **Environment**: Requires DATABASE_URL and SESSION_SECRET environment variables

### Key Architectural Decisions
1. **Monorepo Structure**: Client, server, and shared code in single repository for easier development
2. **Type Safety**: End-to-end TypeScript with Drizzle for database type safety
3. **Serverless Database**: Neon PostgreSQL for scalable cloud deployment
4. **Component Library**: Shadcn/UI for consistent, accessible UI components
5. **Internationalization**: Built-in support for Kazakh and Russian languages
6. **Mobile-First**: Responsive design with dedicated mobile navigation patterns

## Changelog

```
Changelog:
- July 03, 2025. Initial setup with complete Kazakhstan logistics management system
  - Added user authentication with role-based access (admin, manager, driver, warehouse)
  - Implemented Kazakh/Russian bilingual support with language toggle
  - Created mobile-responsive design with bottom navigation
  - Added Kazakhstan-specific features: KZT currency, 12% VAT calculator
  - Database schema for orders, inventory, routes, vehicles, warehouse operations
  - Real-time dashboard with statistics and recent orders display
```

## User Preferences

Preferred communication style: Simple, everyday language.
User prefers to work on implementation later - system is ready for testing when needed.