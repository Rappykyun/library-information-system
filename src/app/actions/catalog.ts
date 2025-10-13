'use server';

import { db } from '@/db';
import { books } from '@/db/schema';
import { requireRole } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addBook(formData: FormData) {
  await requireRole(['procurement', 'librarian']);

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const isbn = formData.get('isbn') as string;
  const quantity = parseInt(formData.get('quantity') as string);

  if (!title || !author || !isbn || !quantity) {
    throw new Error('All fields are required');
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

  return { success: true };
}

export async function updateBook(bookId: number, formData: FormData) {
  await requireRole(['procurement', 'librarian']);

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const isbn = formData.get('isbn') as string;
  const quantity = parseInt(formData.get('quantity') as string);

  if (!title || !author || !isbn || !quantity) {
    throw new Error('All fields are required');
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

  return { success: true };
}

