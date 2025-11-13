import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId: number;
  email: string;
  name: string;
  role: 'borrower' | 'procurement' | 'librarian';
  isLoggedIn: boolean;
}

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required. Please set it in your .env.local file.');
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'library_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

