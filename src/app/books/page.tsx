import { getAllBooks } from '../actions/books';
import { BookBrowser } from '@/components/BookBrowser';
import { getCurrentUser } from '@/lib/auth';

export default async function BooksPage() {
  const books = await getAllBooks();
  const user = await getCurrentUser();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Browse Books</h1>
        <p className="mt-2 text-sm text-gray-600">
          Search and discover books in our library collection
        </p>
      </div>

      <BookBrowser books={books} userRole={user?.role || null} />
    </div>
  );
}

