import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role', { enum: ['borrower', 'procurement', 'librarian'] }).notNull(),
});

export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  author: text('author').notNull(),
  isbn: text('isbn').notNull().unique(),
  quantity: integer('quantity').notNull().default(0),
  availableQuantity: integer('available_quantity').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const checkouts = sqliteTable('checkouts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  bookId: integer('book_id').notNull().references(() => books.id),
  checkoutDate: integer('checkout_date', { mode: 'timestamp' }).notNull(),
  dueDate: integer('due_date', { mode: 'timestamp' }).notNull(),
  returnDate: integer('return_date', { mode: 'timestamp' }),
  status: text('status', { enum: ['active', 'returned'] }).notNull().default('active'),
});

export type User = typeof users.$inferSelect;
export type Book = typeof books.$inferSelect;
export type Checkout = typeof checkouts.$inferSelect;

