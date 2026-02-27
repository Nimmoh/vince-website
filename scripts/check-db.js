const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vincevic-shades';

async function checkDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get database
    const db = mongoose.connection.db;

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📚 Collections in database:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    console.log('');

    // Count documents in each collection
    console.log('📊 Document counts:');
    
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`   - ${col.name}: ${count} documents`);
    }
    console.log('');

    // Show sample data
    console.log('🔍 Sample Data:\n');

    // Services
    const servicesCount = await db.collection('services').countDocuments();
    if (servicesCount > 0) {
      const sampleService = await db.collection('services').findOne();
      console.log('📦 Sample Service:');
      console.log(`   Name: ${sampleService.name}`);
      console.log(`   Category: ${sampleService.category}`);
      console.log(`   Price: ${sampleService.price}`);
      console.log('');
    }

    // Portfolio
    const portfolioCount = await db.collection('portfolios').countDocuments();
    if (portfolioCount > 0) {
      const samplePortfolio = await db.collection('portfolios').findOne();
      console.log('🖼️  Sample Portfolio:');
      console.log(`   Title: ${samplePortfolio.title}`);
      console.log(`   Category: ${samplePortfolio.category}`);
      console.log(`   Location: ${samplePortfolio.location}`);
      console.log('');
    }

    // Orders
    const ordersCount = await db.collection('orders').countDocuments();
    if (ordersCount > 0) {
      const sampleOrder = await db.collection('orders').findOne();
      console.log('🛒 Sample Order:');
      console.log(`   Order #: ${sampleOrder.orderNumber}`);
      console.log(`   Customer: ${sampleOrder.customerName}`);
      console.log(`   Total: ${sampleOrder.totalAmount}`);
      console.log(`   Status: ${sampleOrder.status}`);
      console.log('');
    } else {
      console.log('🛒 Orders: No orders yet (place a test order!)\n');
    }

    // Inquiries
    const inquiriesCount = await db.collection('inquiries').countDocuments();
    if (inquiriesCount > 0) {
      const sampleInquiry = await db.collection('inquiries').findOne();
      console.log('💬 Sample Inquiry:');
      console.log(`   Name: ${sampleInquiry.name}`);
      console.log(`   Phone: ${sampleInquiry.phone}`);
      console.log(`   Status: ${sampleInquiry.status}`);
      console.log('');
    } else {
      console.log('💬 Inquiries: No inquiries yet\n');
    }

    console.log('✨ Database check complete!');
    console.log('\n💡 Tips:');
    console.log('   - Run "npm run seed" to populate services and portfolio');
    console.log('   - Visit http://localhost:3000 to see your website');
    console.log('   - Visit http://localhost:3000/admin for admin dashboard');

  } catch (error) {
    console.error('\n❌ Error checking database:', error.message);
    console.log('\n💡 Make sure MongoDB is running:');
    console.log('   - Start MongoDB: mongod');
    console.log('   - Or use MongoDB Compass');
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the check function
checkDatabase();
