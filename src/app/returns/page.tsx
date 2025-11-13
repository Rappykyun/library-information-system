import { getUserCheckouts, getAllCheckouts, getBorrowingStats } from '../actions/books';
import { getCurrentUser } from '@/lib/auth';
import { ReturnButton } from '@/components/ReturnButton';
import { BorrowingStats } from '@/components/BorrowingStats';

export default async function ReturnsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const checkouts = user.role === 'librarian'
    ? await getAllCheckouts()
    : await getUserCheckouts();

  const stats = await getBorrowingStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {user.role === 'librarian' ? 'All Active Checkouts' : 'My Checkouts'}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {user.role === 'librarian'
            ? 'View and manage all library checkouts'
            : 'View your borrowed books and return them when finished'}
        </p>
      </div>

      <BorrowingStats stats={stats} />

      {checkouts.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-12 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg font-medium text-gray-900">No active checkouts</p>
          <p className="mt-1 text-sm text-gray-500">
            {user.role === 'borrower'
              ? 'Browse the library to find books to borrow'
              : 'No books are currently checked out'}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Checkout Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {checkouts.map(({ checkout, book }) => {
                const dueDate = new Date(checkout.dueDate);
                const checkoutDate = new Date(checkout.checkoutDate);
                const now = new Date();
                const isOverdue = dueDate < now;
                const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                return (
                  <tr key={checkout.id} className={`hover:bg-gray-50 transition-colors ${isOverdue ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <div className="h-10 w-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                          <svg
                            className="h-6 w-6 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <span>{book.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {checkoutDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div>
                        <span className={isOverdue ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                          {dueDate.toLocaleDateString()}
                        </span>
                        {!isOverdue && daysUntilDue <= 3 && (
                          <p className="text-xs text-orange-600 mt-1">
                            Due in {daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {isOverdue ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Overdue
                        </span>
                      ) : daysUntilDue <= 3 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Due Soon
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <ReturnButton checkoutId={checkout.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

