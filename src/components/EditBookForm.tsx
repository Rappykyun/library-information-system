'use client';

import { updateBook } from '@/app/actions/catalog';
import { Book } from '@/db/schema';
import { useState } from 'react';

export function EditBookForm({ book }: { book: Book }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await updateBook(book.id, formData);
      alert('Book updated successfully!');
      setIsEditing(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update book');
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="p-6 hover:bg-gray-50 flex justify-between items-center">
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
        <button
          onClick={() => setIsEditing(true)}
          className="ml-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Edit
        </button>
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
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

