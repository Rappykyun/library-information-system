'use client';

import { updateBook, deleteBook } from '@/app/actions/catalog';
import { Book } from '@/db/schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function EditBookForm({ book }: { book: Book }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await updateBook(book.id, formData);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update book');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    setError(null);
    try {
      await deleteBook(book.id);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete book');
      setDeleting(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="p-6 hover:bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-4 gap-4 flex-1">
            <div>
              <span className="text-xs text-gray-500">Title</span>
              <p className="font-medium">{book.title}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Author</span>
              <p>{book.author}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">ISBN</span>
              <p>{book.isbn}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Quantity (Available)</span>
              <p>
                {book.quantity} ({book.availableQuantity})
              </p>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              disabled={deleting}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:bg-gray-400"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`px-4 py-2 rounded-md text-white text-sm font-medium transition-all duration-300 ${
                deleting
                  ? 'bg-gray-400'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {deleting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </span>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 animate-pulse mt-2">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 bg-purple-50">
      <form action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={book.title}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              defaultValue={book.author}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              defaultValue={book.isbn}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              defaultValue={book.quantity}
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || deleting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setError(null);
              }}
              disabled={loading || deleting}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium disabled:bg-gray-400"
            >
              Cancel
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-600 animate-pulse">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}

