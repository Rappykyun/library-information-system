'use server';

import { db } from '@/db';
import { books, checkouts } from '@/db/schema';
import { requireAuth, requireRole } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getAllBooks() {
  await requireAuth();
  return await db.select().from(books);
}

export async function checkoutBook(bookId: number) {
  const user = await requireAuth();
  
  if (user.role !== 'borrower') {
    throw new Error('Only borrowers can checkout books');
  }

  // Get the book
  const [book] = await db.select().from(books).where(eq(books.id, bookId)).limit(1);
  
  if (!book) {
    throw new Error('Book not found');
  }

  if (book.availableQuantity <= 0) {
    throw new Error('Book is not available');
  }

  // Create checkout record
  const checkoutDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // 14 days from now

  await db.insert(checkouts).values({
    userId: user.userId,
    bookId,
    checkoutDate,
    dueDate,
    status: 'active',
  });

  // Update book availability
  await db
    .update(books)
    .set({ availableQuantity: book.availableQuantity - 1 })
    .where(eq(books.id, bookId));

  revalidatePath('/books');
  revalidatePath('/returns');
  
  return { success: true };
}

export async function getUserCheckouts() {
  const user = await requireAuth();

  const userCheckouts = await db
    .select({
      checkout: checkouts,
      book: books,
    })
    .from(checkouts)
    .innerJoin(books, eq(checkouts.bookId, books.id))
    .where(
      and(
        eq(checkouts.userId, user.userId),
        eq(checkouts.status, 'active')
      )
    );

  return userCheckouts;
}

export async function getAllCheckouts() {
  const user = await requireRole(['librarian']);

  const allCheckouts = await db
    .select({
      checkout: checkouts,
      book: books,
    })
    .from(checkouts)
    .innerJoin(books, eq(checkouts.bookId, books.id))
    .where(eq(checkouts.status, 'active'));

  return allCheckouts;
}

export async function returnBook(checkoutId: number) {
  const user = await requireAuth();

  // Get the checkout
  const [checkout] = await db
    .select()
    .from(checkouts)
    .where(eq(checkouts.id, checkoutId))
    .limit(1);

  if (!checkout) {
    throw new Error('Checkout not found');
  }

  // Check permissions
  if (user.role === 'borrower' && checkout.userId !== user.userId) {
    throw new Error('You can only return your own books');
  }

  if (user.role === 'procurement') {
    throw new Error('Procurement cannot process returns');
  }

  // Update checkout
  await db
    .update(checkouts)
    .set({
      returnDate: new Date(),
      status: 'returned',
    })
    .where(eq(checkouts.id, checkoutId));

  // Get the book and update availability
  const [book] = await db
    .select()
    .from(books)
    .where(eq(books.id, checkout.bookId))
    .limit(1);

  if (book) {
    await db
      .update(books)
      .set({ availableQuantity: book.availableQuantity + 1 })
      .where(eq(books.id, checkout.bookId));
  }

  revalidatePath('/books');
  revalidatePath('/returns');

  return { success: true };
}

