import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { extractToken, verifyToken } from '@/lib/auth';

// GET provider's services
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
    if (!payload || payload.role !== 'provider') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Provider access only' },
        { status: 403 }
      );
    }

    const services = await Service.find({ providerId: payload.userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error: any) {
    console.error('Error fetching provider services:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST create new service
export async function POST(request: NextRequest) {
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
    if (!payload || payload.role !== 'provider') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Provider access only' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const serviceData = {
      ...body,
      providerId: payload.userId,
      status: 'pending', // Requires admin approval
      views: 0,
      contactCount: 0,
    };

    const service = await Service.create(serviceData);

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create service' },
      { status: 500 }
    );
  }
}
