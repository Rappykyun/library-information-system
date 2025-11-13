# Quick Start Guide

## What You'll Have After Installation

After completing the installation, your system will:

### ✅ Run on Your Computer
- **Web-based interface** accessible through any browser
- **No internet required** after initial setup (runs locally)
- **Access URL**: http://localhost:3000

### ✅ Store Everything Locally
- **Database file** (library.db) - stores all books, users, and checkout records
- **Automatic updates** when books are borrowed/returned
- **Backed up easily** - just copy the database file

### ✅ Support Multiple Users
- **Same-time access** - multiple people can use it simultaneously (on network)
- **Role-based access** - Students, Librarians, and Procurement staff
- **Secure login** - password-protected accounts

---

## Installation Time

| Step | Duration |
|------|----------|
| Install Node.js | 5 minutes |
| Download system | 2 minutes |
| Install dependencies | 3-5 minutes |
| Configure | 2 minutes |
| Setup database | 1 minute |
| **Total** | **15-20 minutes** |

---

## What Gets Installed

### On Your Computer:

1. **Node.js Runtime** (if not already installed)
   - ~50 MB
   - Required to run the system

2. **Library System Files** (~100 MB)
   - System code
   - Database
   - Configuration files

3. **Database** (library.db)
   - Starts at ~50 KB
   - Grows with your data
   - Contains:
     - User accounts
     - Book catalog
     - Checkout records
     - Borrowing history

---

## How It Works

### System Architecture:

```
Your Computer
    ↓
[Web Server] ← Running on localhost:3000
    ↓
[Database] ← library.db file
    ↓
[Web Browser] ← Students access here
```

### Access Options:

**Option 1: Single Computer** (Default)
```
Library Computer → Browser → http://localhost:3000
```

**Option 2: Network Access**
```
Library Computer (Server) → Running the system
         ↓
  [Local Network]
         ↓
Student Computers → Browser → http://192.168.1.x:3000
```

---

## 9-Step Installation

### 1. Install Node.js
Download from https://nodejs.org/ → Install → Restart

### 2. Copy System Files
Unzip/copy to: `C:\LibrarySystem`

### 3. Open Terminal
Windows: Press Win+R → type `cmd` → Enter
Navigate: `cd C:\LibrarySystem`

### 4. Install Dependencies
```bash
npm install
```
Wait 3-5 minutes

### 5. Generate Secret Key
```bash
# Windows
powershell -Command "[System.Convert]::ToBase64String((1..32|%{Get-Random -Max 256}))"

# Mac/Linux
openssl rand -base64 32
```
Copy the output

### 6. Create Config File
```bash
copy .env.example .env.local      # Windows
cp .env.example .env.local        # Mac/Linux
```

Edit `.env.local` and paste your secret:
```
SESSION_SECRET=your_generated_secret_here
```

### 7. Setup Database
```bash
npx drizzle-kit migrate
npx tsx src/db/seed.ts
```

### 8. Build for Production
```bash
npm run build
```

### 9. Start the System
```bash
npm start
```

**System is running!** → Open browser → http://localhost:3000

---

## First Time Setup Checklist

After installation is complete:

### Test the System
- [ ] Open http://localhost:3000 in browser
- [ ] Login page appears
- [ ] Test login with: `borrower@test.com` / `password123`
- [ ] Browse Books page loads
- [ ] Try searching for a book
- [ ] Test checkout (click Checkout button)
- [ ] View My Checkouts page
- [ ] Test return (click Return Book button)

### Verify All Roles
- [ ] Borrower: `borrower@test.com` / `password123`
- [ ] Librarian: `librarian@test.com` / `password123`
- [ ] Procurement: `procurement@test.com` / `password123`

### Check Features
- [ ] Search bar works
- [ ] Filters work (Available Only)
- [ ] Sorting works (Title, Author, Availability)
- [ ] Statistics show on My Checkouts page
- [ ] Status badges display (Active, Due Soon, Overdue)
- [ ] Animations work (Processing → Borrowed!)

---

## Daily Use

### Starting the System (Each Day)

1. **Open Terminal/Command Prompt**
2. **Navigate to folder**: `cd C:\LibrarySystem`
3. **Start system**: `npm start`
4. **Keep terminal open** (don't close it)
5. **Access**: http://localhost:3000

### Stopping the System

1. **Go to terminal window**
2. **Press**: `Ctrl + C`
3. **Wait for**: "Server stopped" message
4. **Close terminal**

---

## Network Access (Optional)

To allow other computers to access:

### 1. Find Your IP Address
```bash
ipconfig              # Windows
ifconfig | grep inet  # Mac/Linux
```
Example: `192.168.1.100`

### 2. Start with Network Access
```bash
npm run dev -- -H 0.0.0.0
```

### 3. Configure Firewall
Allow port 3000 through firewall

### 4. Students Access From:
http://192.168.1.100:3000 (use your actual IP)

---

## What Students Will Do

### Student Experience:

1. **Open Browser**
   - Chrome, Firefox, Safari, or Edge

2. **Go to Library System**
   - http://localhost:3000 (or your network address)

3. **Login**
   - Enter email and password
   - Click "Sign in"

4. **Browse Books**
   - Search for books
   - Filter by availability
   - Sort by preference

5. **Checkout Books**
   - Click purple "Checkout" button
   - See spinner: "Processing..."
   - See success: "✓ Borrowed!" (green)
   - Page refreshes automatically

6. **View Checkouts**
   - See personal statistics
   - View borrowed books
   - Check due dates
   - See status badges

7. **Return Books**
   - Click green "Return Book" button
   - See spinner: "Processing..."
   - See success: "✓ Returned!" (blue)
   - Page refreshes automatically

---

## Files You'll See

After installation, your folder will contain:

```
library-information-system/
│
├── src/                      ← System code (don't modify)
├── node_modules/             ← Dependencies (auto-managed)
├── public/                   ← Images/assets
│
├── library.db                ← DATABASE (BACKUP THIS!)
├── .env.local                ← Your configuration
├── package.json              ← System info
│
└── README.md                 ← Documentation
```

**IMPORTANT FILES TO BACKUP:**
- `library.db` - Your entire database
- `.env.local` - Configuration

---

## System Capabilities

### What It Can Do:

✅ **Books**
- Add unlimited books
- Edit book information
- Track quantities and availability
- Search and filter books
- Sort by multiple criteria

✅ **Students/Borrowers**
- Create accounts (via database)
- Borrow books (14-day period)
- Return books anytime
- View borrowing history
- See overdue warnings
- Track statistics

✅ **Librarians**
- All borrower features
- View all checkouts system-wide
- Process returns for anyone
- Manage book catalog
- Add/edit/delete books

✅ **Security**
- Password-protected accounts
- Session-based authentication
- Role-based permissions
- Secure cookies

### What It Cannot Do (Out of the Box):

❌ **User Management UI** - Users must be added via database
❌ **Fine Calculations** - No automated late fee system
❌ **Email Notifications** - No email reminders for due dates
❌ **Book Reservations** - No waitlist for unavailable books
❌ **Internet Access** - Not accessible outside your network (by default)

---

## Storage & Performance

### Disk Space:
- **Initial**: ~150 MB (system + dependencies)
- **Database Growth**: ~10 KB per 100 checkouts
- **500 books, 1000 checkouts**: ~200 MB total

### Performance:
- **Response Time**: <100ms (local)
- **Concurrent Users**: 20-50 (typical)
- **Search Speed**: Instant (client-side filtering)
- **Database**: No performance issues expected for typical library

---

## Backup Strategy

### Automatic Backup (Recommended):

Create a daily backup script:

**Windows** (backup.bat):
```batch
@echo off
cd C:\LibrarySystem
copy library.db backups\library-%date:~-4,4%%date:~-10,2%%date:~-7,2%.db
```

**Mac/Linux** (backup.sh):
```bash
#!/bin/bash
cd ~/LibrarySystem
cp library.db backups/library-$(date +%Y%m%d).db
```

Run daily via Task Scheduler (Windows) or cron (Mac/Linux)

---

## Support & Maintenance

### Regular Maintenance:
- **Daily**: Run backup script
- **Weekly**: Check system is running smoothly
- **Monthly**: Review disk space
- **Quarterly**: Update system (if updates available)

### Getting Help:
1. Check USER_GUIDE.md for detailed instructions
2. Check Troubleshooting section
3. Review error messages carefully
4. Contact IT support with screenshots

---

## Success Indicators

Your installation is successful when:

✅ System starts without errors
✅ Login page accessible in browser
✅ Test accounts work
✅ Books appear in browse page
✅ Search/filter/sort functions work
✅ Checkout creates a record
✅ Return removes the record
✅ Statistics update correctly
✅ Animations play smoothly

---

## Next Steps After Installation

1. **Test thoroughly** with all three user roles
2. **Add real books** to replace sample data
3. **Create real user accounts** (see USER_GUIDE.md)
4. **Set up backups** (create backup script)
5. **Train staff** on system usage
6. **Launch to students** with announcement

---

**Your library system is ready to use! 🎉📚**

For detailed instructions, see:
- **USER_GUIDE.md** - Complete usage instructions
- **README.md** - Technical documentation
- **DEPLOYMENT_NOTES.md** - Production deployment details
