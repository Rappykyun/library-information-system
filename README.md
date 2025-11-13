# Library Information System

A production-ready library management system with role-based access control built with Next.js, SQLite, and Drizzle ORM.

## Features

### For Students/Borrowers
- **Advanced Book Search** - Search books by title, author, or ISBN with real-time filtering
- **Smart Filtering** - Filter books by availability status (all, available, unavailable)
- **Flexible Sorting** - Sort books by title, author, or availability
- **Visual Book Browser** - Enhanced UI with book icons and availability badges
- **One-Click Checkout** - Borrow books instantly with automatic due date assignment (14 days)
- **Borrowing Dashboard** - View personal statistics (active checkouts, total borrowed, books returned, overdue count)
- **My Checkouts** - Track borrowed books with due dates and status indicators
- **Overdue Alerts** - Visual warnings for overdue books and books due soon
- **Easy Returns** - Return books with a single click

### For Librarians
- **Catalog Management** - Add and edit books with intelligent quantity management
- **System-Wide View** - See all active checkouts across all users
- **Book Statistics** - Track total inventory and availability
- **Return Processing** - Process returns for any user

### For Procurement
- **Catalog Management** - Add new books and update existing inventory
- **Quantity Management** - Update book quantities with automatic availability calculation

### Security & Technical
- **Role-Based Access Control** - Three user roles with granular permissions
- **Secure Authentication** - Session-based auth with encrypted cookies
- **Real-Time Updates** - Instant UI refresh after checkout/return operations
- **Inline Error Handling** - User-friendly error messages without blocking popups

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Then edit `.env.local` and add your session secret:

```bash
# Generate a secure random string (32+ characters)
openssl rand -base64 32
```

Update `.env.local` with the generated secret:

```
SESSION_SECRET=your_generated_secret_here
```

### 3. Set Up Database

```bash
# Generate migrations
npx drizzle-kit migrate

# Seed database with test data
npx tsx src/db/seed.ts
```

The seed script will create three test accounts (see Test Accounts section below).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Test Accounts

After running the seed script, you can log in with these test accounts:

| Role | Email | Password |
|------|-------|----------|
| Borrower | borrower@test.com | password123 |
| Procurement | procurement@test.com | password123 |
| Librarian | librarian@test.com | password123 |

**Note:** Change these passwords in production!

## Role Permissions

### Borrower
- Browse all books
- Checkout available books
- View own active checkouts
- Return own books
- Cannot access catalog management

### Procurement
- Browse all books
- Add new books to catalog
- Edit existing books
- Delete books from catalog (if no active checkouts)
- Cannot view checkouts
- Cannot process returns

### Librarian
- All borrower permissions
- All procurement permissions
- View all active checkouts system-wide
- Process returns for any user
- Delete books from catalog (if no active checkouts)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: SQLite + Drizzle ORM
- **Authentication**: Iron Session with encrypted cookies
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **Security**: bcryptjs password hashing, httpOnly cookies

## Project Structure

```
src/
├── app/
│   ├── actions/          # Server actions for books and catalog
│   ├── api/auth/         # Authentication API routes
│   ├── books/            # Browse books page
│   ├── catalog/          # Catalog management page
│   ├── login/            # Login page
│   ├── returns/          # Returns management page
│   └── layout.tsx        # Root layout with navigation
├── components/           # Reusable UI components
├── db/                   # Database schema, migrations, and seed
├── lib/                  # Authentication and session utilities
└── middleware.ts         # Route protection and RBAC middleware
```

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `SESSION_SECRET` | **Yes** | Secret key for session encryption (32+ chars) | None |
| `DATABASE_PATH` | No | Path to SQLite database file | `./library.db` |
| `NODE_ENV` | No | Environment mode | `development` |

## Security Features

- Session-based authentication with Iron Session
- Password hashing with bcryptjs (10 rounds)
- httpOnly cookies (protected from JavaScript access)
- Secure cookies in production (HTTPS only)
- Route-level middleware protection
- Role-based access control on all server actions
- SQL injection prevention via Drizzle ORM parameterized queries
- Type-safe database operations

## Deployment Checklist

- [ ] Generate a secure `SESSION_SECRET` (32+ characters)
- [ ] Update test account passwords in seed script
- [ ] Set `NODE_ENV=production`
- [ ] Run `npm run build` to verify build succeeds
- [ ] Test all user roles and permissions
- [ ] Verify session cookies are secure over HTTPS
- [ ] Backup database before deployment

## Known Limitations

- No pagination on book lists (consider adding for large catalogs)
- No book deletion functionality (books cannot be removed)
- No user management UI (users must be added via database)
- No book search or filtering
- No book reservation/waitlist system
- No overdue fine calculations
- No email notifications

## Development

```bash
# Install dependencies
npm install

# Run development server with hot reload
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start

# Database commands
npx drizzle-kit generate    # Generate migration files
npx drizzle-kit migrate     # Run migrations
npx tsx src/db/seed.ts      # Seed test data
```

## Support

For issues or questions, refer to the codebase documentation or contact your development team.
