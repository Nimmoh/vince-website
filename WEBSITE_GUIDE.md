# Vincevic Shades Interprises - Website Guide

## Pages Overview

### 1. Home Page (`/`)
- Video hero section with company introduction
- Featured services grid
- Category filtering
- Search functionality
- Contact inquiry form

### 2. Services Page (`/services`)
- Complete services catalog
- Category filtering (Shades, Gazebos, Pagolas, Gates)
- Detailed service information with pricing
- Request quote functionality

### 3. Portfolio Page (`/portfolio`)
- Showcase of completed projects
- Category filtering
- Multiple images per project
- Project details (location, description)
- Click to view full project gallery

### 4. About Us Page (`/about`)
- Company story and history
- Our approach and values
- Statistics and achievements
- Contact information

### 5. Admin Dashboard (`/admin`)
- Services management (Add, Edit, Delete)
- Customer inquiries tracking
- Portfolio management
- Real-time data from MongoDB

## Image Management

### Current Images in `/public/images/`:
- image1.jpeg through image17.jpeg
- video1.mp4 (hero section background)

### Adding New Images:
1. Save images to `/public/images/` folder
2. Use path format: `/images/filename.jpeg`
3. Recommended size: 800x800px or larger

## Admin Features

### Services Management:
- Add new services with name, category, price, description, and image
- Edit existing services
- Delete services
- Images display automatically when path starts with `/images/`

### Portfolio Management:
- View all portfolio items
- Delete portfolio items
- Each item can have multiple images
- Categorized by service type

### Inquiries:
- View customer inquiries
- See contact details and messages
- Track inquiry status

## API Endpoints

### Services:
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Portfolio:
- `GET /api/portfolio` - Get all portfolio items
- `POST /api/portfolio` - Create portfolio item
- `PUT /api/portfolio/[id]` - Update portfolio item
- `DELETE /api/portfolio/[id]` - Delete portfolio item

### Inquiries:
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry

## Adding Portfolio Items

### Via API (Recommended):
```bash
curl -X POST http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Modern Car Shade Installation",
    "category": "shades",
    "images": ["/images/image1.jpeg", "/images/image5.jpeg"],
    "description": "Premium curved car shade with UV protection",
    "location": "Nairobi",
    "featured": true
  }'
```

### Via MongoDB:
Connect to your MongoDB database and insert documents into the `portfolios` collection.

## Theme Consistency

All pages maintain the elegant theme with:
- Cormorant Garamond font for headings
- DM Sans font for body text
- Gold (#c9a84c) accent color
- Dark ink (#0f1117) for headers
- Warm surface (#f7f5f0) for backgrounds

## Contact Information

Displayed across all pages:
- Phone: 0720 120 616
- Phone: 0716 632 889
- WhatsApp: Available via contact buttons
- Business Hours: Mon-Fri 8AM-6PM, Sat 9AM-5PM

## Next Steps

1. Connect MongoDB database (update MONGODB_URI in .env.local)
2. Add more portfolio items via API
3. Customize service offerings in admin panel
4. Add more images to `/public/images/` folder
5. Test all pages and functionality

## Support

For technical support or questions, refer to the codebase documentation or contact the development team.
