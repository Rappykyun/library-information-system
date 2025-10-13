import { getUserCheckouts, getAllCheckouts } from '../actions/books';
import { getCurrentUser } from '@/lib/auth';
import { ReturnButton } from '@/components/ReturnButton';

export default async function ReturnsPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }

  const checkouts = user.role === 'librarian' 
    ? await getAllCheckouts() 
    : await getUserCheckouts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {user.role === 'librarian' ? 'All Active Checkouts' : 'My Checkouts'}
      </h1>

      {checkouts.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center text-gray-500">
          No active checkouts found.
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {checkouts.map(({ checkout, book }) => {
                const dueDate = new Date(checkout.dueDate);
                const isOverdue = dueDate < new Date();

                return (
                  <tr key={checkout.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {book.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(checkout.checkoutDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}>
                        {dueDate.toLocaleDateString()}
                        {isOverdue && ' (Overdue)'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
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

