import { db } from './index';
import { users, books } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  await db.insert(users).values([
    {
      email: 'borrower@test.com',
      password: hashedPassword,
      name: 'John Borrower',
      role: 'borrower',
    },
    {
      email: 'procurement@test.com',
      password: hashedPassword,
      name: 'Jane Procurement',
      role: 'procurement',
    },
    {
      email: 'librarian@test.com',
      password: hashedPassword,
      name: 'Bob Librarian',
      role: 'librarian',
    },
  ]);

  console.log('✓ Users created');

  // Create sample books
  await db.insert(books).values([
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      quantity: 5,
      availableQuantity: 5,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0061120084',
      quantity: 3,
      availableQuantity: 3,
    },
    {
      title: '1984',
      author: 'George Orwell',
      isbn: '978-0451524935',
      quantity: 4,
      availableQuantity: 4,
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      isbn: '978-0141439518',
      quantity: 2,
      availableQuantity: 2,
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      isbn: '978-0316769174',
      quantity: 3,
      availableQuantity: 3,
    },
  ]);

  console.log('✓ Books created');
  console.log('\nSeed complete! Test credentials:');
  console.log('Borrower: borrower@test.com / password123');
  console.log('Procurement: procurement@test.com / password123');
  console.log('Librarian: librarian@test.com / password123');
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });

