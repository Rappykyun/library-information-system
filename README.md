# Library Information System

A simple library management system with role-based access control built with Next.js, SQLite, and Drizzle ORM.

## Features

- **Browse Books** - View all available books
- **Checkout Books** - Borrowers can checkout available books
- **Return Books** - Process book returns
- **Update Catalog** - Add and edit books (Procurement & Librarian only)
- **Role-Based Access Control** - Three user roles with different permissions

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

```bash
# Generate migrations
npx drizzle-kit migrate

# Seed database with test data
npx tsx src/db/seed.ts
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Borrower | borrower@test.com | password123 |
| Procurement | procurement@test.com | password123 |
| Librarian | librarian@test.com | password123 |

## Role Permissions

- **Borrower**: Browse books, checkout books, return own books
- **Procurement**: Browse books, add/edit catalog
- **Librarian**: All permissions, view all checkouts

## Tech Stack

- Next.js 15 (App Router)
- SQLite + Drizzle ORM
- Iron Session (authentication)
- Tailwind CSS
- TypeScript
