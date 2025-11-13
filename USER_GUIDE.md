# Library System User Guide

## Installation & Setup (For IT Staff/Administrators)

### System Requirements

**Minimum Requirements:**
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Processor**: Dual-core 2.0 GHz or better
- **RAM**: 4 GB minimum (8 GB recommended)
- **Storage**: 500 MB free disk space
- **Node.js**: Version 20 or higher
- **Internet Connection**: Required for initial setup

### Step-by-Step Installation

#### 1. Install Node.js (If Not Already Installed)

**Windows:**
1. Download Node.js from https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer (.msi file)
4. Follow installation wizard (accept defaults)
5. Restart your computer

**macOS:**
1. Download Node.js from https://nodejs.org/
2. Download the LTS version (.pkg file)
3. Run the installer
4. Follow installation wizard
5. Restart Terminal

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
node --version  # Verify installation
```

#### 2. Download the Library System

**Option A: From USB/CD (Provided by IT)**
1. Copy the `library-information-system` folder to your desired location
   - Recommended: `C:\LibrarySystem` (Windows) or `~/LibrarySystem` (Mac/Linux)
2. Open that folder

**Option B: From Git Repository (If Available)**
```bash
git clone [repository-url]
cd library-information-system
```

#### 3. Open Terminal/Command Prompt

**Windows:**
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
3. Navigate to system folder:
   ```
   cd C:\LibrarySystem
   ```

**macOS:**
1. Press `Cmd + Space`
2. Type "Terminal" and press Enter
3. Navigate to system folder:
   ```
   cd ~/LibrarySystem
   ```

**Linux:**
1. Open Terminal (Ctrl + Alt + T)
2. Navigate to system folder:
   ```
   cd ~/LibrarySystem
   ```

#### 4. Install System Dependencies

In the terminal, run:
```bash
npm install
```

**What This Does:**
- Downloads all required packages
- Sets up the database system
- Prepares the web server
- Takes 2-5 minutes depending on internet speed

**Expected Output:**
```
added 300+ packages in 2m
```

#### 5. Configure Environment Variables

Create a secure session secret:

**Windows:**
```bash
# Generate a random secret
powershell -Command "[System.Convert]::ToBase64String((1..32|%{Get-Random -Max 256}))"
```

**macOS/Linux:**
```bash
# Generate a random secret
openssl rand -base64 32
```

Copy the generated text (e.g., `K8x2Np9Qm5Zr7Yt...`)

Create configuration file:
```bash
# Copy the example file
cp .env.example .env.local

# Edit the file (Windows: use Notepad, Mac/Linux: use nano or vim)
notepad .env.local     # Windows
nano .env.local        # Mac/Linux
```

Paste your generated secret:
```
SESSION_SECRET=K8x2Np9Qm5Zr7Yt4Wv6Xn3Mp0Lj8Hg5
```

Save and close the file.

#### 6. Set Up the Database

Run these commands one by one:

```bash
# Create database tables
npx drizzle-kit migrate

# Add sample books and test accounts
npx tsx src/db/seed.ts
```

**Expected Output:**
```
✓ Users created
✓ Books created

Seed complete! Test credentials:
Borrower: borrower@test.com / password123
Procurement: procurement@test.com / password123
Librarian: librarian@test.com / password123
```

#### 7. Test the System

**Development Mode (For Testing):**
```bash
npm run dev
```

**Expected Output:**
```
▲ Next.js 15.5.4
- Local:        http://localhost:3000
```

**Test Access:**
1. Open a web browser
2. Go to: `http://localhost:3000`
3. You should see the login page
4. Try logging in with test account:
   - Email: `borrower@test.com`
   - Password: `password123`

#### 8. Build for Production

Once testing is complete, build the production version:

```bash
npm run build
```

**What This Does:**
- Optimizes the system for performance
- Compresses files
- Prepares for production use
- Takes 1-2 minutes

**Expected Output:**
```
✓ Compiled successfully
Route (app)                         Size
├ ƒ /                                0 B
├ ƒ /books                       2.51 kB
├ ƒ /catalog                     1.26 kB
└ ƒ /returns                     1.15 kB
```

#### 9. Run in Production Mode

```bash
npm start
```

**System is now running!**
- Access at: `http://localhost:3000`
- Leave this terminal window open while the system is in use

---

### What Gets Installed

When you complete the installation, your computer will have:

#### 1. **Files & Folders** (~100 MB)
```
library-information-system/
├── src/                    # System code
├── public/                 # Images and assets
├── node_modules/           # Dependencies (auto-downloaded)
├── library.db              # Database file (created during setup)
├── .env.local              # Your configuration
└── package.json            # System info
```

#### 2. **Database** (library.db)
- SQLite database file
- Stores all book and user data
- Grows as you add books/users
- Initial size: ~50 KB
- **IMPORTANT**: Backup this file regularly!

#### 3. **Test Data** (From seed script)
- 3 test user accounts
- 20 sample books
- Can be removed after testing

#### 4. **Web Server** (localhost:3000)
- Runs on your computer
- Accessible via web browser
- Only accessible on your local network (by default)

---

### Network Access Setup

#### Option 1: Single Computer (Default)
- System accessible only on the computer it's installed on
- URL: `http://localhost:3000`
- Perfect for: Small libraries, testing

#### Option 2: Local Network Access
Allow other computers on your network to access the system:

**Find Your IP Address:**

Windows:
```bash
ipconfig
# Look for "IPv4 Address" (e.g., 192.168.1.100)
```

macOS/Linux:
```bash
ifconfig | grep inet
# Look for 192.168.x.x or 10.0.x.x
```

**Run the System:**
```bash
npm run dev -- -H 0.0.0.0
```

**Access from Other Computers:**
- On other computers, open browser
- Go to: `http://[YOUR-IP]:3000`
- Example: `http://192.168.1.100:3000`

---

### Daily Operations

#### Starting the System

**Every time you want to use the system:**

1. Open Terminal/Command Prompt
2. Navigate to system folder:
   ```bash
   cd C:\LibrarySystem        # Windows
   cd ~/LibrarySystem         # Mac/Linux
   ```
3. Start the system:
   ```bash
   npm start
   ```
4. Keep the terminal window open
5. System is now accessible at `http://localhost:3000`

#### Stopping the System

**To shut down the system:**
1. Go to the terminal window running the system
2. Press `Ctrl + C`
3. System will shut down gracefully
4. You can now close the terminal

---

### Backup & Maintenance

#### Daily Backup (Recommended)

**Backup the Database:**
```bash
# Windows
copy library.db library-backup-%date%.db

# Mac/Linux
cp library.db library-backup-$(date +%Y%m%d).db
```

**What to Backup:**
- `library.db` - Main database (CRITICAL)
- `.env.local` - Configuration file

**Backup Location:**
- Store on external drive
- Or cloud storage (Dropbox, Google Drive)
- Keep at least 7 days of backups

#### Monthly Maintenance

**Check for Updates:**
- Contact your IT support
- They'll provide update instructions

**Database Optimization:**
```bash
# Check database size
# Windows: dir library.db
# Mac/Linux: ls -lh library.db

# If size is >50MB, consider archiving old records
```

---

### Troubleshooting Installation

#### Problem: "Node.js not found"
**Solution:**
1. Verify Node.js installation: `node --version`
2. If not installed, follow Step 1 above
3. Restart terminal after installation

#### Problem: "npm install" fails
**Solution:**
1. Check internet connection
2. Try again: `npm install --force`
3. If still fails, delete `node_modules` folder and retry

#### Problem: "SESSION_SECRET required" error
**Solution:**
1. Make sure `.env.local` file exists
2. Check that it contains: `SESSION_SECRET=...`
3. Restart the system

#### Problem: "Port 3000 already in use"
**Solution:**
1. Another program is using port 3000
2. Close other applications
3. Or use different port: `npm start -- -p 3001`

#### Problem: Cannot access from other computers
**Solution:**
1. Check firewall settings
2. Allow port 3000 through firewall:
   - Windows: Windows Defender Firewall → Allow an app
   - Mac: System Preferences → Security → Firewall
3. Verify IP address is correct
4. Both computers must be on same network

---

### Production Deployment Checklist

Before opening to users:

- [ ] Node.js installed (version 20+)
- [ ] System files copied to permanent location
- [ ] `npm install` completed successfully
- [ ] `.env.local` created with secure SESSION_SECRET
- [ ] Database migrated: `npx drizzle-kit migrate`
- [ ] Test data seeded: `npx tsx src/db/seed.ts`
- [ ] System tested in browser
- [ ] Production build created: `npm run build`
- [ ] System starts correctly: `npm start`
- [ ] Backup system in place
- [ ] Firewall configured (if network access needed)
- [ ] Test accounts verified
- [ ] Administrator trained on basic operations

---

### System Requirements Summary

| Component | Requirement | Purpose |
|-----------|-------------|---------|
| **Node.js** | v20+ | Runs the system |
| **npm** | Included with Node.js | Manages packages |
| **Storage** | 500 MB | System files |
| **RAM** | 4 GB | System performance |
| **Browser** | Chrome/Firefox/Safari/Edge | User access |
| **Database** | SQLite (included) | Data storage |

---

### Getting Help

**For Installation Issues:**
1. Check this guide's Troubleshooting section
2. Review error messages carefully
3. Contact IT support with:
   - Error message (screenshot)
   - Step you're on
   - Operating system version

**For System Usage:**
- See user guide sections below for each role
- Test accounts available for practice

---

## For Students (Borrowers)

### How to Borrow a Book

1. **Login**
   - Go to the login page
   - Enter your email: `borrower@test.com`
   - Enter password: `password123`
   - Click "Sign in"

2. **Browse Books**
   - Navigate to "Browse Books" page
   - You'll see:
     - Search bar at the top
     - Filter options (All Books / Available Only / Unavailable Only)
     - Sort options (Title / Author / Availability)
     - List of all books with availability status

3. **Search for a Book** (Optional)
   - Type in the search box to find books by:
     - Title (e.g., "Harry Potter")
     - Author (e.g., "J.K. Rowling")
     - ISBN (e.g., "978-0-439-13959-8")
   - Results update in real-time as you type

4. **Filter Books** (Optional)
   - Click the "Availability" dropdown
   - Select "Available Only" to see only books you can borrow right now
   - Select "Unavailable Only" to see which books are checked out

5. **Checkout a Book**
   - Find the book you want
   - Look at the "Available" column - it should show a number greater than 0
   - Click the **purple "Checkout" button** in the Action column
   - Confirm "Are you sure you want to checkout this book?"
   - The page will refresh automatically
   - The book is now yours for 14 days!

### Viewing Your Borrowed Books

1. **Navigate to "My Checkouts"**
   - Click "Returns" in the navigation menu
   - You'll see your personal dashboard

2. **View Your Statistics**
   At the top, you'll see 4 cards showing:
   - **Active Checkouts** - How many books you currently have
   - **Total Borrowed** - All books you've ever borrowed
   - **Books Returned** - How many you've returned
   - **Overdue Books** - Books past their due date (RED if > 0)

3. **Check Book Status**
   Each book in your list shows:
   - **Book Title** with icon
   - **Author**
   - **Checkout Date** - When you borrowed it
   - **Due Date** - When it's due back
   - **Status Badge**:
     - 🟢 **Active** (Green) - Not due soon
     - 🟠 **Due Soon** (Orange) - Due within 3 days
     - 🔴 **Overdue** (Red) - Past due date
   - **"Due in X days"** warning for books due within 3 days

### How to Return a Book

1. **Go to "My Checkouts"** page
2. **Find the book** you want to return
3. **Click the green "Return Book" button**
4. **Confirm** "Are you sure you want to return this book?"
5. **Done!** The page refreshes and the book is removed from your list

### Understanding Status Indicators

**Availability Badges on Browse Page:**
- 🟢 **Available** (Green badge) - Copies are available to borrow
- 🔴 **Out of Stock** (Red badge) - All copies are currently checked out

**Status Badges on My Checkouts Page:**
- 🟢 **Active** - Book is not due soon, you're all good
- 🟠 **Due Soon** - Book is due within 3 days, return soon!
- 🔴 **Overdue** - Book is past its due date, return ASAP!

**Visual Warnings:**
- Books due within 3 days show: "Due in X days" in orange text
- Overdue books have a light red background across the entire row
- Overdue count in your stats dashboard turns red

---

## For Librarians

### Managing All Checkouts

1. **Login**
   - Email: `librarian@test.com`
   - Password: `password123`

2. **View All Active Checkouts**
   - Navigate to "All Active Checkouts" page
   - You'll see EVERY book checked out in the system
   - Shows same status indicators as borrowers (Active/Due Soon/Overdue)

3. **Process Returns**
   - Click the green "Return Book" button for any checkout
   - You can return books for ANY user (not just your own)

4. **Add/Edit/Delete Books**
   - Navigate to "Update Catalog" page
   - **Add New Book**: Fill out the form (Title, Author, ISBN, Quantity)
   - **Edit Existing Book**: Click "Edit" button, make changes, click "Save Changes"
   - **Delete Book**: Click "Delete" button, confirm deletion (only if no active checkouts)

### Managing the Catalog

1. **Add a New Book**
   - Go to "Update Catalog" page
   - Fill in the "Add New Book" form:
     - **Title**: Book title
     - **Author**: Author name
     - **ISBN**: ISBN number
     - **Quantity**: Total number of copies
   - Click "Add Book"
   - Book appears in catalog immediately

2. **Edit an Existing Book**
   - Go to "Update Catalog" page
   - Find the book in the "Existing Books" list
   - Click the purple "Edit" button
   - Update any fields
   - Click green "Save Changes" button
   - Click "Cancel" to discard changes

3. **Delete a Book**
   - Go to "Update Catalog" page
   - Find the book in the "Existing Books" list
   - Click the red "Delete" button
   - Confirm the deletion when prompted
   - **Note**: Cannot delete books with active checkouts
   - **Warning**: Deletion is permanent and cannot be undone

4. **Update Quantities**
   When you change the quantity:
   - **Increase**: Available quantity increases by the same amount
   - **Decrease**: Available quantity decreases (but never below 0)
   - Example: Book has 5 total, 3 available. Change to 7 total → 5 available

---

## For Procurement Staff

### Managing the Catalog

1. **Login**
   - Email: `procurement@test.com`
   - Password: `password123`

2. **Add/Edit/Delete Books**
   - Same as Librarians (see above)
   - You can add new books, update existing ones, and delete books
   - **Deleting books**: Only possible if there are no active checkouts

3. **What You CANNOT Do**
   - View checkouts (you don't see who borrowed what)
   - Process returns (that's for librarians only)

---

## Tips & Best Practices

### For Students

**Finding Books Faster:**
1. Use the search bar for specific books or authors
2. Set filter to "Available Only" to see what you can borrow right now
3. Sort by "Availability" to see most available books first

**Managing Due Dates:**
1. Check "My Checkouts" regularly
2. Return books early if you're done reading
3. Watch for orange "Due Soon" badges
4. Don't let books go overdue (red badges)!

**Understanding Your Stats:**
1. **Active Checkouts** - Current books = max borrowing limit awareness
2. **Total Borrowed** - Your reading history count
3. **Books Returned** - Shows your return rate
4. **Overdue Books** - Keep this at 0!

### For Librarians

**Monitoring Checkouts:**
1. Sort by due date to see what's due soon
2. Look for red highlighted rows (overdue books)
3. Orange "Due Soon" badges = might need reminders
4. Track popular books by availability patterns

**Managing Inventory:**
1. Monitor "Available" vs "Total" quantities
2. If a book shows "0 available" often, consider buying more copies
3. Update quantities when receiving new shipments
4. Edit book info if there are errors

---

## Common Questions

**Q: How long can I borrow a book?**
A: 14 days from checkout date

**Q: What happens if a book is overdue?**
A: It shows in red on your checkouts page and counts in your "Overdue Books" stat

**Q: Can I return a book early?**
A: Yes! Click "Return Book" anytime

**Q: What if all copies are checked out?**
A: You'll see "Out of Stock" badge and the checkout button will be disabled

**Q: Can I checkout multiple books?**
A: Yes! There's no limit on active checkouts

**Q: Can I see my past returns?**
A: The "Books Returned" stat shows your total count, but detailed history isn't available yet

**Q: How do I know if a book is available?**
A: Look at the "Available" column - any number > 0 means copies are available

**Q: What does "Due in 2 days" mean?**
A: The book is due in 2 days. Return it soon to avoid going overdue!

---

## Troubleshooting

**Problem: Can't find a book**
- Check your search spelling
- Try searching by author instead of title
- Make sure filters aren't hiding it (try "All Books" filter)

**Problem: Checkout button is disabled**
- Book is out of stock (all copies checked out)
- Wait for someone to return it

**Problem: Error message appears**
- Read the error message (appears in red below button)
- Common issues:
  - Book not available (someone just checked it out)
  - Session expired (try logging in again)
  - Network error (refresh page)

**Problem: Stats not updating**
- Refresh the page
- Wait a moment and check again

**Problem: Book not in catalog**
- Ask librarian or procurement staff to add it

---

## System Features Summary

### Search & Discovery
- ✓ Real-time search
- ✓ Multiple filters
- ✓ Flexible sorting
- ✓ Results counter

### Borrowing
- ✓ One-click checkout
- ✓ Automatic 14-day due dates
- ✓ Inline error messages
- ✓ Instant page updates

### Tracking
- ✓ Personal statistics dashboard
- ✓ Active checkouts list
- ✓ Overdue detection
- ✓ Due soon warnings

### Returns
- ✓ One-click return
- ✓ Status indicators
- ✓ Visual warnings
- ✓ Easy return process

### Management
- ✓ Add books
- ✓ Edit books
- ✓ Update quantities
- ✓ System-wide checkout view (librarians)

---

## Need Help?

Contact your library administrator or IT support if you experience issues not covered in this guide.

**Happy Reading!** 📚
