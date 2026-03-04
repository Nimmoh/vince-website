import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { extractToken, verifyToken } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

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

    const service = await Service.findByIdAndUpdate(
      id,
      { $set: { status: 'approved' } },
      { new: true }
    );

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
      message: 'Service approved successfully',
    });
  } catch (error: any) {
    console.error('Error approving service:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to approve service' },
      { status: 500 }
    );
  }
}
