# Database Seeding Guide

This guide will help you seed your MongoDB database with initial data for Vincevic Shades Interprises.

## Prerequisites

1. **MongoDB Running**: Make sure MongoDB is running on your local machine
   - Default connection: `mongodb://localhost:27017`
   - You can start MongoDB with: `mongod` (or use MongoDB Compass)

2. **Environment Variables**: Your `.env.local` file should have:
   ```
   MONGODB_URI="mongodb://localhost:27017/vincevic-shades"
   ```

## How to Seed the Database

### Step 1: Install Dependencies (if needed)
```bash
npm install dotenv
```

### Step 2: Run the Seed Script
```bash
npm run seed
```

This will:
- ✅ Connect to your MongoDB database
- 🗑️ Clear existing services and portfolio data
- 📦 Insert 17 services (shades, gazebos, pagolas, gates)
- 🖼️ Insert 8 portfolio items with project examples
- ✨ Display a summary of inserted data

## What Gets Seeded

### Services (17 items)
- **Shades**: Car shades, patio shades, commercial structures
- **Gazebos**: Garden gazebos, event gazebos, poolside gazebos
- **Pagolas**: Entrance pagolas, garden pergolas, decorative pagolas
- **Gates**: Automated sliding gates, swing gates, security systems

Each service includes:
- Name
- Category
- Price (in KSh)
- Description
- Image path

### Portfolio Items (8 projects)
- Real project examples from different Nairobi locations
- Multiple images per project
- Project descriptions and locations
- Featured project flags

## Troubleshooting

### Error: "Cannot connect to MongoDB"
- Make sure MongoDB is running: `mongod`
- Check your connection string in `.env.local`
- Try: `mongodb://127.0.0.1:27017/vincevic-shades` instead

### Error: "Module not found: dotenv"
```bash
npm install dotenv
```

### Error: "Module not found: mongoose"
```bash
npm install mongoose
```

## Verify the Data

After seeding, you can verify the data in several ways:

### 1. Using MongoDB Compass
- Open MongoDB Compass
- Connect to `mongodb://localhost:27017`
- Browse the `vincevic-shades` database
- Check `services` and `portfolios` collections

### 2. Using the Application
- Start your Next.js app: `npm run dev`
- Visit `http://localhost:3000` - Services should display
- Visit `http://localhost:3000/portfolio` - Portfolio items should display
- Visit `http://localhost:3000/admin` - Admin dashboard should show data

### 3. Using MongoDB Shell
```bash
mongosh
use vincevic-shades
db.services.countDocuments()  # Should return 17
db.portfolios.countDocuments()  # Should return 8
```

## Re-seeding

To clear and re-seed the database:
```bash
npm run seed
```

The script automatically clears existing data before inserting new data.

## Custom Data

To add your own data, edit `scripts/seed.js`:
- Modify the `services` array
- Modify the `portfolioItems` array
- Run `npm run seed` again

## Production Seeding

For production databases (MongoDB Atlas):
1. Update `MONGODB_URI` in `.env.local` with your Atlas connection string
2. Run `npm run seed`
3. Verify data in MongoDB Atlas dashboard

## Need Help?

If you encounter issues:
1. Check MongoDB is running
2. Verify `.env.local` has correct `MONGODB_URI`
3. Check console output for specific error messages
4. Ensure all dependencies are installed: `npm install`
