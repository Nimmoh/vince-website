# Vercel Deployment Guide

## ✅ Build Fixed!

The Next.js 15+ compatibility issue has been resolved. All dynamic route handlers now properly handle `params` as a Promise.

## 🚀 Deploy to Vercel

### Step 1: Prepare Your MongoDB Database

You have two options:

#### Option A: MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new cluster (M0 Free tier is fine)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/vincevic-shades?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password

3. **Seed Your Production Database**
   - Update `.env.local` with your Atlas connection string
   - Run: `npm run seed`
   - This will populate your production database

#### Option B: Use Local MongoDB (Development Only)

If you want to test with local MongoDB first:
- Keep using: `mongodb://localhost:27017/vincevic-shades`
- Note: This won't work on Vercel (needs cloud database)

### Step 2: Deploy to Vercel

#### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Vincevic Shades website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   In Vercel project settings, add these environment variables:
   
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vincevic-shades?retryWrites=true&w=majority
   
   NEXT_PUBLIC_COMPANY_NAME=Vincevic Shades Interprises
   NEXT_PUBLIC_PHONE_PRIMARY=0720120616
   NEXT_PUBLIC_PHONE_SECONDARY=0716632889
   NEXT_PUBLIC_WHATSAPP_NUMBER=254720120616
   NEXT_PUBLIC_BUSINESS_HOURS_WEEKDAY=Mon–Fri: 8AM – 6PM
   NEXT_PUBLIC_BUSINESS_HOURS_SATURDAY=Saturday: 9AM – 5PM
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ADMIN_PASSWORD=vincevic2026
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

#### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts to set up project
# Add environment variables when prompted
```

### Step 3: Verify Deployment

1. **Check Your Site**
   - Visit your Vercel URL (e.g., `your-project.vercel.app`)
   - Test all pages: Home, Services, Portfolio, About, Contact, Cart
   - Test cart functionality
   - Test admin dashboard

2. **Test Database Connection**
   - Services should load from MongoDB
   - Portfolio should display
   - Try adding items to cart
   - Test checkout flow

3. **Check Admin Dashboard**
   - Visit `/admin`
   - Verify statistics display
   - Check services management
   - Test order management

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your domain (e.g., `vincevicshades.co.ke`)
   - Follow DNS configuration instructions

2. **Update Environment Variables**
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain

## 🔧 Troubleshooting

### Build Fails on Vercel

**Error: "Cannot connect to MongoDB"**
- Make sure `MONGODB_URI` is set in Vercel environment variables
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check your MongoDB password doesn't have special characters

**Error: "Module not found"**
- Run `npm install` locally
- Commit `package-lock.json`
- Push to GitHub and redeploy

### Services Not Displaying

**Empty services/portfolio**
- Your database might be empty
- Run seed script with production MongoDB URI:
  ```bash
  # Update .env.local with production URI
  npm run seed
  ```

### Images Not Loading

**Images show broken**
- Make sure all images are in `/public/images/` directory
- Commit and push images to GitHub
- Redeploy on Vercel

### Cart Not Working

**Cart doesn't persist**
- This is normal - cart uses localStorage (client-side only)
- Cart will work once deployed
- Test in production environment

## 📊 MongoDB Atlas Configuration

### Allow Vercel IP Addresses

1. **In MongoDB Atlas Dashboard**
   - Go to Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add Vercel's IP ranges

2. **Database User**
   - Go to Database Access
   - Create a user with read/write permissions
   - Use this username/password in connection string

### Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

Replace:
- `USERNAME` - Your MongoDB user
- `PASSWORD` - Your MongoDB password (URL encode special characters)
- `CLUSTER` - Your cluster name
- `DATABASE_NAME` - `vincevic-shades`

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to GitHub
   - Add `.env.local` to `.gitignore`
   - Set all secrets in Vercel dashboard

2. **MongoDB Security**
   - Use strong passwords
   - Enable IP whitelisting if possible
   - Regularly rotate credentials

3. **Admin Access**
   - Change `ADMIN_PASSWORD` from default
   - Consider adding proper authentication

## 📈 Post-Deployment

### Monitor Your Site

1. **Vercel Analytics**
   - Enable in Vercel dashboard
   - Track page views and performance

2. **MongoDB Monitoring**
   - Check Atlas dashboard for database metrics
   - Monitor connection counts
   - Set up alerts for issues

### Update Content

**Add New Services:**
1. Go to `/admin`
2. Click "Services" tab
3. Add new services via form

**Update Portfolio:**
1. Edit `scripts/seed.js`
2. Run `npm run seed` with production URI
3. Or add portfolio management UI

## 🎯 Checklist Before Going Live

- [ ] MongoDB Atlas cluster created
- [ ] Database seeded with services and portfolio
- [ ] All environment variables set in Vercel
- [ ] Site deployed and accessible
- [ ] All pages load correctly
- [ ] Cart functionality works
- [ ] Admin dashboard accessible
- [ ] Images display properly
- [ ] Contact forms work
- [ ] WhatsApp links work
- [ ] Phone numbers correct
- [ ] Custom domain configured (if applicable)

## 🆘 Need Help?

### Common Issues

1. **"Cannot read properties of undefined"**
   - Check all environment variables are set
   - Verify MongoDB connection string

2. **"Failed to compile"**
   - Run `npm run build` locally first
   - Fix any TypeScript errors
   - Check all imports are correct

3. **"Database connection failed"**
   - Verify MongoDB URI is correct
   - Check network access in Atlas
   - Ensure database user has permissions

### Vercel Support

- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
- Support: https://vercel.com/support

## 🎉 Success!

Once deployed, your site will be live at:
- Vercel URL: `https://your-project.vercel.app`
- Custom domain: `https://your-domain.com` (if configured)

Share your link and start receiving orders! 🚀

---

**Last Updated:** After fixing Next.js 15+ params compatibility
**Build Status:** ✅ Passing
**Ready for Production:** Yes
