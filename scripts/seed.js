const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vincevic-shades';

// Service Schema
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

// Portfolio Schema
const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  location: { type: String },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);

const services = [
  {
    name: 'Premium Car Shade',
    category: 'shades',
    price: 'KSh 45,000',
    image: '/images/image1.jpeg',
    description: 'Durable car parking shade with UV protection and modern curved design. Perfect for residential and commercial properties.'
  },
  {
    name: 'Luxury Outdoor Gazebo',
    category: 'gazebo',
    price: 'KSh 150,000',
    image: '/images/image2.jpeg',
    description: 'Premium gazebo with stone pillars, perfect for outdoor entertainment and events. Built to last with weather-resistant materials.'
  },
  {
    name: 'Modern Wooden Pagola',
    category: 'pagola',
    price: 'KSh 75,000',
    image: '/images/image3.jpeg',
    description: 'Contemporary wooden pagola with sleek design for entrance or patio coverage. Adds elegance to any property.'
  },
  {
    name: 'Industrial Cantilever Shade',
    category: 'shades',
    price: 'KSh 95,000',
    image: '/images/image4.jpeg',
    description: 'Heavy-duty cantilever shade structure ideal for commercial and residential spaces. Maximum coverage with minimal support.'
  },
  {
    name: 'Residential Patio Shade',
    category: 'shades',
    price: 'KSh 55,000',
    image: '/images/image5.jpeg',
    description: 'Weather-resistant patio shade cover with elegant design. Creates comfortable outdoor living spaces.'
  },
  {
    name: 'Garden Gazebo Deluxe',
    category: 'gazebo',
    price: 'KSh 120,000',
    image: '/images/image6.jpeg',
    description: 'Spacious garden gazebo perfect for relaxation and outdoor gatherings. Premium finishes and durable construction.'
  },
  {
    name: 'Entrance Pagola',
    category: 'pagola',
    price: 'KSh 65,000',
    image: '/images/image7.jpeg',
    description: 'Elegant entrance pagola with modern architectural design. Makes a stunning first impression.'
  },
  {
    name: 'Automated Sliding Gate',
    category: 'gates',
    price: 'KSh 120,000',
    image: '/images/image8.jpeg',
    description: 'Automated sliding gate with remote control and security features. Smooth operation with safety sensors.'
  },
  {
    name: 'Commercial Shade Structure',
    category: 'shades',
    price: 'KSh 85,000',
    image: '/images/image9.jpeg',
    description: 'Large commercial-grade shade structure for parking or outdoor areas. Built for high-traffic environments.'
  },
  {
    name: 'Event Gazebo Premium',
    category: 'gazebo',
    price: 'KSh 180,000',
    image: '/images/image10.jpeg',
    description: 'Premium event gazebo with luxury finishes and spacious design. Perfect for weddings and corporate events.'
  },
  {
    name: 'Decorative Pagola',
    category: 'pagola',
    price: 'KSh 70,000',
    image: '/images/image11.jpeg',
    description: 'Decorative pagola perfect for garden pathways and entrances. Combines beauty with functionality.'
  },
  {
    name: 'Security Gate System',
    category: 'gates',
    price: 'KSh 150,000',
    image: '/images/image12.jpeg',
    description: 'Complete security gate system with automation and access control. Advanced security features included.'
  },
  {
    name: 'Double Car Shade',
    category: 'shades',
    price: 'KSh 75,000',
    image: '/images/image13.jpeg',
    description: 'Spacious double car shade with reinforced structure. Protects multiple vehicles from weather elements.'
  },
  {
    name: 'Garden Pergola',
    category: 'pagola',
    price: 'KSh 80,000',
    image: '/images/image14.jpeg',
    description: 'Beautiful garden pergola with climbing plant support. Creates a natural outdoor retreat.'
  },
  {
    name: 'Swing Gate Automated',
    category: 'gates',
    price: 'KSh 135,000',
    image: '/images/image15.jpeg',
    description: 'Automated swing gate with dual motor system. Elegant design with reliable performance.'
  },
  {
    name: 'Poolside Gazebo',
    category: 'gazebo',
    price: 'KSh 165,000',
    image: '/images/image16.jpeg',
    description: 'Waterproof poolside gazebo with modern design. Perfect for pool areas and outdoor entertainment.'
  },
  {
    name: 'Carport Shade Extended',
    category: 'shades',
    price: 'KSh 105,000',
    image: '/images/image17.jpeg',
    description: 'Extended carport shade for multiple vehicles. Heavy-duty construction with long-lasting materials.'
  }
];

const portfolioItems = [
  {
    title: 'Residential Car Shade Installation - Karen',
    category: 'shades',
    images: ['/images/image1.jpeg', '/images/image4.jpeg', '/images/image5.jpeg'],
    description: 'Premium car shade installation for a luxury residence in Karen. Features UV-resistant fabric and modern curved design.',
    location: 'Karen, Nairobi',
    featured: true
  },
  {
    title: 'Garden Gazebo Project - Runda',
    category: 'gazebo',
    images: ['/images/image2.jpeg', '/images/image6.jpeg', '/images/image10.jpeg'],
    description: 'Elegant garden gazebo with stone pillars and custom lighting. Perfect for outdoor entertainment.',
    location: 'Runda, Nairobi',
    featured: true
  },
  {
    title: 'Entrance Pagola - Kitisuru',
    category: 'pagola',
    images: ['/images/image3.jpeg', '/images/image7.jpeg', '/images/image11.jpeg'],
    description: 'Modern entrance pagola with wooden finish. Adds architectural elegance to the property entrance.',
    location: 'Kitisuru, Nairobi',
    featured: false
  },
  {
    title: 'Automated Gate System - Muthaiga',
    category: 'gates',
    images: ['/images/image8.jpeg', '/images/image12.jpeg', '/images/image15.jpeg'],
    description: 'Complete automated gate system with remote access and security features. Smooth and reliable operation.',
    location: 'Muthaiga, Nairobi',
    featured: true
  },
  {
    title: 'Commercial Shade Structure - Westlands',
    category: 'shades',
    images: ['/images/image9.jpeg', '/images/image13.jpeg', '/images/image17.jpeg'],
    description: 'Large commercial parking shade for office complex. Covers 20+ parking spaces with durable materials.',
    location: 'Westlands, Nairobi',
    featured: false
  },
  {
    title: 'Event Gazebo - Lavington',
    category: 'gazebo',
    images: ['/images/image10.jpeg', '/images/image16.jpeg', '/images/image2.jpeg'],
    description: 'Premium event gazebo for outdoor weddings and corporate events. Luxury finishes and spacious design.',
    location: 'Lavington, Nairobi',
    featured: true
  },
  {
    title: 'Garden Pergola - Rosslyn',
    category: 'pagola',
    images: ['/images/image14.jpeg', '/images/image11.jpeg', '/images/image3.jpeg'],
    description: 'Beautiful garden pergola with climbing plant support. Creates a natural outdoor living space.',
    location: 'Rosslyn, Nairobi',
    featured: false
  },
  {
    title: 'Double Car Shade - Kileleshwa',
    category: 'shades',
    images: ['/images/image13.jpeg', '/images/image1.jpeg', '/images/image5.jpeg'],
    description: 'Spacious double car shade with reinforced structure. Modern design with excellent weather protection.',
    location: 'Kileleshwa, Nairobi',
    featured: false
  }
];

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert services
    console.log('\n📦 Inserting services...');
    const insertedServices = await Service.insertMany(services);
    console.log(`✅ Inserted ${insertedServices.length} services`);

    // Insert portfolio items
    console.log('\n🖼️  Inserting portfolio items...');
    const insertedPortfolio = await Portfolio.insertMany(portfolioItems);
    console.log(`✅ Inserted ${insertedPortfolio.length} portfolio items`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Services: ${insertedServices.length}`);
    console.log(`   - Portfolio Items: ${insertedPortfolio.length}`);
    console.log('\n✨ Your database is ready to use!');

  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
