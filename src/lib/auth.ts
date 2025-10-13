import { getSession } from './session';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function getCurrentUser() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return null;
  }
  return session;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden');
  }
  return user;
}

export async function login(email: string, password: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user) {
    return { success: false, error: 'Invalid credentials' };
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return { success: false, error: 'Invalid credentials' };
  }

  const session = await getSession();
  session.userId = user.id;
  session.email = user.email;
  session.name = user.name;
  session.role = user.role;
  session.isLoggedIn = true;
  await session.save();

  return { success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

