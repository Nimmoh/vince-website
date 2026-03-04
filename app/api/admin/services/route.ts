import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import User from '@/models/User';
import { extractToken, verifyToken } from '@/lib/auth';

// GET all services with provider info (admin only)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = extractToken(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access only' },
        { status: 403 }
      );
    }

    const services = await Service.find().sort({ createdAt: -1 });
    
    // Get provider info for each service
    const servicesWithProviders = await Promise.all(
      services.map(async (service) => {
        if (service.providerId) {
          const provider = await User.findById(service.providerId).select('profile.name providerInfo.businessName');
          return {
            ...service.toObject(),
            providerName: provider?.profile?.name || 'Unknown',
            businessName: provider?.providerInfo?.businessName || 'N/A',
          };
        }
        return {
          ...service.toObject(),
          providerName: 'Vincevic Shades',
          businessName: 'Vincevic Shades Interprises',
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: servicesWithProviders,
    });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
