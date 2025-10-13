import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

export async function Navigation() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    'use server';
    const { logout } = await import('@/lib/auth');
    await logout();
    const { redirect } = await import('next/navigation');
    redirect('/login');
  };

  return (
    <nav className="bg-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">Library System</h1>
            <div className="flex space-x-4">
              <Link
                href="/books"
                className="hover:bg-purple-700 px-3 py-2 rounded transition"
              >
                Browse Books
              </Link>
              {user.role === 'borrower' && (
                <Link
                  href="/returns"
                  className="hover:bg-purple-700 px-3 py-2 rounded transition"
                >
                  My Checkouts
                </Link>
              )}
              {user.role === 'librarian' && (
                <Link
                  href="/returns"
                  className="hover:bg-purple-700 px-3 py-2 rounded transition"
                >
                  All Checkouts
                </Link>
              )}
              {(user.role === 'procurement' || user.role === 'librarian') && (
                <Link
                  href="/catalog"
                  className="hover:bg-purple-700 px-3 py-2 rounded transition"
                >
                  Update Catalog
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              {user.name} ({user.role})
            </span>
            <form action={handleLogout}>
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

