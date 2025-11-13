'use client';

import { returnBook } from '@/app/actions/books';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ReturnButton({ checkoutId }: { checkoutId: number }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleReturn = async () => {
    if (!confirm('Are you sure you want to return this book?')) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await returnBook(checkoutId);
      setSuccess(true);
      setLoading(false);

      // Show success message briefly before refresh
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to return book');
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleReturn}
        disabled={loading || success}
        className={`px-4 py-2 rounded text-white text-sm font-medium transition-all duration-300 ${
          success
            ? 'bg-blue-600'
            : loading
            ? 'bg-gray-400'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {success ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Returned!
          </span>
        ) : loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Return Book'
        )}
      </button>
      {error && (
        <p className="text-sm text-red-600 animate-pulse">{error}</p>
      )}
    </div>
  );
}
