'use server';

import { db } from '@/db';
import { books, checkouts } from '@/db/schema';
import { requireRole } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addBook(formData: FormData) {
  await requireRole(['procurement', 'librarian']);

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const isbn = formData.get('isbn') as string;
  const quantityStr = formData.get('quantity') as string;
  const quantity = parseInt(quantityStr, 10);

  if (!title || !author || !isbn || isNaN(quantity) || quantity < 0) {
    throw new Error('All fields are required and quantity must be a valid positive number');
  }

  await db.insert(books).values({
    title,
    author,
    isbn,
    quantity,
    availableQuantity: quantity,
  });

  revalidatePath('/catalog');
  revalidatePath('/books');
}

export async function updateBook(bookId: number, formData: FormData) {
  await requireRole(['procurement', 'librarian']);

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const isbn = formData.get('isbn') as string;
  const quantityStr = formData.get('quantity') as string;
  const quantity = parseInt(quantityStr, 10);

  if (!title || !author || !isbn || isNaN(quantity) || quantity < 0) {
    throw new Error('All fields are required and quantity must be a valid positive number');
  }

  // Get current book to calculate available quantity change
  const [currentBook] = await db.select().from(books).where(eq(books.id, bookId)).limit(1);

  if (!currentBook) {
    throw new Error('Book not found');
  }

  const quantityDiff = quantity - currentBook.quantity;
  const newAvailableQuantity = currentBook.availableQuantity + quantityDiff;

  await db
    .update(books)
    .set({
      title,
      author,
      isbn,
      quantity,
      availableQuantity: Math.max(0, newAvailableQuantity),
    })
    .where(eq(books.id, bookId));

  revalidatePath('/catalog');
  revalidatePath('/books');
}

export async function deleteBook(bookId: number) {
  await requireRole(['procurement', 'librarian']);

  // Check for active checkouts
  const activeCheckouts = await db
    .select()
    .from(checkouts)
    .where(and(
      eq(checkouts.bookId, bookId),
      eq(checkouts.status, 'active')
    ));

  if (activeCheckouts.length > 0) {
    throw new Error('Cannot delete book with active checkouts. Please wait until all copies are returned.');
  }

  // Check if book exists
  const [book] = await db.select().from(books).where(eq(books.id, bookId)).limit(1);

  if (!book) {
    throw new Error('Book not found');
  }

  // Delete the book
  await db.delete(books).where(eq(books.id, bookId));

  revalidatePath('/catalog');
  revalidatePath('/books');
}

