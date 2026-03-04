# 🚀 Installation Guide - Marketplace Features

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas connection
- Git (optional)

---

## Step 1: Install Dependencies

Run this command to install all required packages including authentication libraries:

```bash
npm install
```

This will install:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- All existing dependencies

---

## Step 2: Environment Configuration

Your `.env.local` file has been updated with:

```env
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-chars-vincevic2026"
```

**⚠️ IMPORTANT**: Change this secret in production to a strong random string!

---

## Step 3: Start MongoDB

Make sure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or if using MongoDB as a service, it should already be running
```

---

## Step 4: Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## Step 5: Test the Features

### Test Customer Registration
1. Go to: http://localhost:3000/register
2. Fill in the form:
   - Name: Test Customer
   - Email: customer@test.com
   - Phone: 0712345678
   - Password: password123
3. Click "Create Account"
4. You should be logged in and redirected to homepage

### Test Provider Registration
1. Go to: http://localhost:3000/register/provider
2. Fill in the form:
   - Name: Test Provider
   - Business Name: Test Shades Business
   - Email: provider@test.com
   - Phone: 0723456789
   - Password: password123
3. Click "Register as Provider"
4. You should be logged in

### Test Login
1. Go to: http://localhost:3000/login
2. Use credentials from registration
3. Click "Sign In"
4. You should be logged in

---

## Step 6: Verify Database

Check that users were created:

```bash
npm run db:check
```

Or use MongoDB Compass/Shell:

```javascript
use vincevic-shades
db.users.find().pretty()
```

You should see your registered users with:
- Hashed passwords
- Role (customer/provider)
- Profile information
- Provider info (for providers)

---

## 🎯 What's Working Now

✅ User registration (customer & provider)
✅ Secure login with JWT
✅ Password hashing
✅ Role-based authentication
✅ Auth state management
✅ Protected API routes
✅ Token persistence

---

## 🔍 Troubleshooting

### "Module not found: bcryptjs"
```bash
npm install bcryptjs jsonwebtoken
```

### "JWT_SECRET is not defined"
Check that `.env.local` has the JWT_SECRET line

### "Cannot connect to MongoDB"
Make sure MongoDB is running:
```bash
# Check if MongoDB is running
mongosh
# or
mongo
```

### "Email already registered"
The email is already in the database. Use a different email or clear the users collection:
```javascript
use vincevic-shades
db.users.deleteMany({})
```

---

## 📱 Testing API Endpoints

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@test.com",
    "password": "password123",
    "name": "API Test User",
    "phone": "0712345678",
    "role": "customer"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@test.com",
    "password": "password123"
  }'
```

### Get User (requires token)
```bash
curl http://localhost:3000/api/users/USER_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚀 Next Steps

After confirming everything works:

1. **Phase 2**: Provider Dashboard
   - Service management
   - Analytics
   - Profile editing

2. **Phase 3**: Enhanced Features
   - Reviews system
   - Search & filters
   - Messaging

3. **Phase 4**: Monetization
   - Subscription plans
   - Featured listings
   - Payment integration

---

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify MongoDB is running
4. Ensure all dependencies are installed
5. Check `.env.local` configuration

---

**Ready to continue with Phase 2?** Let me know!

