'use client';

import { checkoutBook } from '@/app/actions/books';
import { useState } from 'react';

export function CheckoutButton({ bookId, available }: { bookId: number; available: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!confirm('Are you sure you want to checkout this book?')) {
      return;
    }

    setLoading(true);
    try {
      await checkoutBook(bookId);
      alert('Book checked out successfully!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to checkout book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={!available || loading}
      className={`px-4 py-2 rounded text-white text-sm font-medium ${
        available && !loading
          ? 'bg-purple-600 hover:bg-purple-700'
          : 'bg-gray-400 cursor-not-allowed'
      }`}
    >
      {loading ? 'Processing...' : available ? 'Checkout' : 'Not Available'}
    </button>
  );
}

