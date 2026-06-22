# Cognitive Lamp — cognitivelamp.com

Next.js marketing website + blog for Cognitive Lamp Private Limited.

## Stack
- **Framework:** Next.js 14
- **Database:** Oracle Cloud Always Free (node-oracledb)
- **Styling:** Tailwind CSS
- **Editor:** TipTap
- **Hosting:** Hostinger (Node.js)

## Local Setup

```bash
git clone https://github.com/cognitivelamp/cognitivelamp-website-node-js.git
cd cognitivelamp
npm install
cp .env.example .env.local
# Fill in your Oracle Cloud credentials in .env.local
npm run dev
```

## Oracle Setup
1. Log in to Oracle Cloud → Autonomous Database → SQL Worksheet
2. Run `lib/dbSetup.sql` to create all tables
3. Create your admin user:
```sql
INSERT INTO cl_admins (email, password_hash)
VALUES ('sharat@cognitivelamp.com', '<bcrypt_hash_here>');
```
Generate the hash with Node.js:
```js
const bcrypt = require('bcryptjs')
console.log(bcrypt.hashSync('your_password', 10))
```

## Hostinger Deployment
1. Push code to GitHub
2. In Hostinger → Node.js → Import from GitHub
3. Set environment variables from `.env.example`
4. Build command: `npm run build`
5. Start command: `npm start`

## Admin Panel
Access at: `https://cognitivelamp.com/admin/login`

## Routes