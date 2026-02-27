# Vincevic Shades Interprises - Setup Guide

## 🎉 Your E-commerce Website is Ready!

This guide will help you get your website up and running with a fully seeded database.

## ✅ What's Already Done

1. ✅ MongoDB connection configured
2. ✅ Database seeded with 17 services
3. ✅ Database seeded with 8 portfolio items
4. ✅ E-commerce cart functionality implemented
5. ✅ Admin dashboard with statistics
6. ✅ Order management system

## 🚀 Quick Start

### 1. Start MongoDB (if not running)
```bash
# Windows
mongod

# Or use MongoDB Compass GUI
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Access Your Website
- **Homepage**: http://localhost:3000
- **Services**: http://localhost:3000/services
- **Portfolio**: http://localhost:3000/portfolio
- **About**: http://localhost:3000/about
- **Contact**: http://localhost:3000/contact
- **Cart**: http://localhost:3000/cart
- **Admin Dashboard**: http://localhost:3000/admin

## 📊 Database Information

### Connection String
```
mongodb://localhost:27017/vincevic-shades
```

### Collections Created
- **services** (17 documents)
- **portfolios** (8 documents)
- **orders** (empty - will populate as customers order)
- **inquiries** (empty - will populate as customers inquire)

## 🛒 E-commerce Features

### Customer Features
1. **Browse Services**: View all services with images, prices, and descriptions
2. **Add to Cart**: Click "Add to Cart" on any service
3. **Shopping Cart**: View cart with quantity controls
4. **Checkout**: Enter customer details and choose contact method
5. **Order Placement**: Submit orders via WhatsApp, Email, or Phone

### Admin Features
1. **Dashboard**: View statistics (orders, customers, revenue)
2. **Orders Management**: View and update order status
3. **Services Management**: Add, edit, delete services
4. **Inquiries**: View customer inquiries
5. **Portfolio**: Manage project showcase

## 📝 Admin Access

Visit: http://localhost:3000/admin

No password required in development mode.

## 🔄 Re-seeding the Database

If you need to reset the database:

```bash
npm run seed
```

This will:
- Clear all existing services and portfolio items
- Insert fresh data
- Keep orders and inquiries intact

## 📦 What's in the Database

### Services (17 items)
- **Shades** (7): Car shades, patio shades, commercial structures
- **Gazebos** (4): Garden gazebos, event gazebos, poolside gazebos
- **Pagolas** (3): Entrance pagolas, garden pergolas
- **Gates** (3): Automated gates, security systems

### Portfolio (8 projects)
- Karen: Residential car shade
- Runda: Garden gazebo
- Kitisuru: Entrance pagola
- Muthaiga: Automated gate system
- Westlands: Commercial shade
- Lavington: Event gazebo
- Rosslyn: Garden pergola
- Kileleshwa: Double car shade

## 🎨 Customization

### Update Company Information
Edit `.env.local`:
```env
NEXT_PUBLIC_COMPANY_NAME="Vincevic Shades Interprises"
NEXT_PUBLIC_PHONE_PRIMARY="0720120616"
NEXT_PUBLIC_PHONE_SECONDARY="0716632889"
NEXT_PUBLIC_WHATSAPP_NUMBER="254720120616"
```

### Add More Services
1. Go to Admin Dashboard: http://localhost:3000/admin
2. Click "Services" tab
3. Click "+ Add New Service"
4. Fill in details and save

### Add More Portfolio Items
Edit `scripts/seed.js` and add to the `portfolioItems` array, then run:
```bash
npm run seed
```

## 🧪 Testing the E-commerce Flow

### Test Customer Journey
1. Visit homepage: http://localhost:3000
2. Browse services
3. Click "Add to Cart" on 2-3 services
4. Click cart icon (🛒) in header
5. Adjust quantities if needed
6. Click "Proceed to Checkout"
7. Fill in customer details
8. Choose "WhatsApp" to test order submission
9. Order will be saved to database

### Test Admin Dashboard
1. Visit: http://localhost:3000/admin
2. Click "Dashboard" tab - see statistics
3. Click "Orders" tab - see the test order
4. Update order status to "Confirmed"
5. Check statistics update in Dashboard

## 📱 Contact Methods

When customers checkout, they can choose:
- **WhatsApp**: Opens WhatsApp with pre-filled order details
- **Email**: Opens email client with order details
- **Phone Call**: Shows order number and phone number to call

## 🔍 Verify Database

### Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `vincevic-shades`
4. Browse collections: `services`, `portfolios`, `orders`, `inquiries`

### Using MongoDB Shell
```bash
mongosh
use vincevic-shades
db.services.countDocuments()  # Should return 17
db.portfolios.countDocuments()  # Should return 8
db.services.find().pretty()  # View all services
```

## 🚨 Troubleshooting

### "Cannot connect to MongoDB"
- Start MongoDB: `mongod`
- Or use MongoDB Compass
- Check connection string in `.env.local`

### "No services displaying"
- Run seed script: `npm run seed`
- Check MongoDB is running
- Check browser console for errors

### "Cart not working"
- Clear browser localStorage
- Refresh the page
- Check browser console for errors

### "Admin dashboard shows 0 orders"
- Place a test order first
- Check MongoDB connection
- Verify order was saved: `db.orders.find()`

## 📚 Next Steps

1. **Test Everything**: Go through the customer journey
2. **Customize Content**: Update services, portfolio, images
3. **Add Real Images**: Replace placeholder images in `/public/images/`
4. **Configure Email**: Set up email notifications (optional)
5. **Deploy**: Deploy to Vercel or your hosting provider

## 🎯 Production Deployment

### Before Deploying
1. Update MongoDB URI to production database (MongoDB Atlas)
2. Run seed script on production database
3. Test all features
4. Update environment variables on hosting platform

### MongoDB Atlas Setup
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in production environment
5. Run seed script: `npm run seed`

## 💡 Tips

- **Images**: All images are in `/public/images/` directory
- **Styling**: Uses Tailwind CSS and custom CSS
- **Theme**: Gold (#c9a84c) and dark ink (#0f1117) colors
- **Fonts**: Cormorant Garamond (headings), DM Sans (body)

## 📞 Support

If you need help:
1. Check this guide
2. Check `scripts/README.md` for database seeding help
3. Check browser console for errors
4. Check MongoDB logs

---

## 🎊 You're All Set!

Your website is ready to use. Start the dev server and explore:

```bash
npm run dev
```

Then visit: http://localhost:3000

Enjoy your new e-commerce website! 🚀
