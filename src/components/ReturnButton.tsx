'use client';

import { returnBook } from '@/app/actions/books';
import { useState } from 'react';

export function ReturnButton({ checkoutId }: { checkoutId: number }) {
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    if (!confirm('Are you sure you want to return this book?')) {
      return;
    }

    setLoading(true);
    try {
      await returnBook(checkoutId);
      alert('Book returned successfully!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to return book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReturn}
      disabled={loading}
      className={`px-4 py-2 rounded text-white text-sm font-medium ${
        loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {loading ? 'Processing...' : 'Return Book'}
    </button>
  );
}
