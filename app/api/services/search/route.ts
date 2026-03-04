import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const county = searchParams.get('county');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'recent';
    const verifiedOnly = searchParams.get('verified') === 'true';

    // Build filter
    const filter: any = { status: 'approved' };

    // Text search
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Location filter
    if (county) {
      filter['location.county'] = { $regex: county, $options: 'i' };
    }

    // Price filter (basic string comparison - can be improved)
    if (minPrice || maxPrice) {
      // This is a simplified version - in production, store price as number
      if (minPrice) {
        filter.price = { $regex: minPrice, $options: 'i' };
      }
    }

    // Verified providers only
    if (verifiedOnly) {
      const verifiedProviders = await User.find({
        role: 'provider',
        'providerInfo.verified': true,
      }).select('_id');
      
      const verifiedIds = verifiedProviders.map(p => p._id.toString());
      filter.providerId = { $in: verifiedIds };
    }

    // Build sort
    let sort: any = {};
    switch (sortBy) {
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'popular':
        sort = { views: -1 };
        break;
      case 'recent':
      default:
        sort = { createdAt: -1 };
    }

    const services = await Service.find(filter).sort(sort).limit(50);

    // Get provider info
    const servicesWithProviders = await Promise.all(
      services.map(async (service) => {
        if (service.providerId) {
          const provider = await User.findById(service.providerId).select(
            'profile.name providerInfo.businessName providerInfo.verified providerInfo.rating'
          );
          return {
            ...service.toObject(),
            provider: provider ? {
              name: provider.profile.name,
              businessName: provider.providerInfo?.businessName,
              verified: provider.providerInfo?.verified || false,
              rating: provider.providerInfo?.rating || 0,
            } : null,
          };
        }
        return service.toObject();
      })
    );

    return NextResponse.json({
      success: true,
      data: servicesWithProviders,
      count: servicesWithProviders.length,
    });
  } catch (error: any) {
    console.error('Error searching services:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Search failed' },
      { status: 500 }
    );
  }
}
