# ⚡ Quick Start Guide

## 🚀 Get Your Marketplace Running in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Start MongoDB (30 sec)
```bash
# Make sure MongoDB is running
mongod
```

### Step 3: Start Server (30 sec)
```bash
npm run dev
```

### Step 4: Test the Features (3 min)

#### A. Register as Provider
1. Visit: http://localhost:3000/register/provider
2. Fill form:
   - Name: Test Provider
   - Business: Test Shades Co
   - Email: provider@test.com
   - Password: password123
3. Click "Register as Provider"

#### B. Post a Service
1. You'll be redirected to dashboard
2. Click "Post Service"
3. Fill form:
   - Name: Premium Car Shade
   - Category: Shades
   - Price: KSh 50,000
   - Description: High-quality car shade
   - Upload an image
4. Submit (status will be "pending")

#### C. Approve Service (as Admin)
1. Open MongoDB Compass or shell
2. Run:
   ```javascript
   use vincevic-shades
   db.users.updateOne(
     { email: "provider@test.com" },
     { $set: { role: "admin" } }
   )
   ```
3. Visit: http://localhost:3000/admin/approvals
4. Click "Approve" on your service

#### D. Search & Browse
1. Visit: http://localhost:3000/search
2. Your service should now appear!
3. Try filters and search

---

## 🎯 Key URLs

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `/` | Main site with search |
| Search | `/search` | Browse all services |
| Register Customer | `/register` | Customer signup |
| Register Provider | `/register/provider` | Provider signup |
| Login | `/login` | User login |
| Provider Dashboard | `/provider/dashboard` | Manage services |
| Post Service | `/provider/services/new` | Add new service |
| Admin Approvals | `/admin/approvals` | Approve services |
| Provider Profile | `/providers/[id]` | Public profile |

---

## 🔑 Test Accounts

### Create Admin
```javascript
// In MongoDB
use vincevic-shades
db.users.updateOne(
  { email: "YOUR_EMAIL" },
  { $set: { role: "admin" } }
)
```

### Provider Account
- Register at `/register/provider`
- Access dashboard at `/provider/dashboard`

### Customer Account
- Register at `/register`
- Browse and search services

---

## ✅ What You Can Do Now

### As Provider:
- ✅ Post services with images
- ✅ Edit/delete services
- ✅ View analytics (views, contacts)
- ✅ Edit profile

### As Customer:
- ✅ Search services
- ✅ Filter by category, location
- ✅ View provider profiles
- ✅ Add to cart
- ✅ Leave reviews

### As Admin:
- ✅ Approve/reject services
- ✅ Manage users
- ✅ View all services

---

## 🐛 Quick Troubleshooting

**Can't connect to MongoDB?**
```bash
# Start MongoDB
mongod
```

**Module not found?**
```bash
npm install
```

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
# Then restart
npm run dev
```

---

## 📚 Full Documentation

For detailed information, see:
- `COMPLETE_MARKETPLACE_GUIDE.md` - Complete guide
- `MARKETPLACE_PHASE2_COMPLETE.md` - All features
- `INSTALLATION_GUIDE.md` - Setup details

---

## 🎉 You're Ready!

Your marketplace is fully functional with:
- ✅ Multi-vendor support
- ✅ Service posting & approval
- ✅ Search & filters
- ✅ Reviews & ratings
- ✅ Provider profiles
- ✅ Admin dashboard

**Start exploring at:** http://localhost:3000

