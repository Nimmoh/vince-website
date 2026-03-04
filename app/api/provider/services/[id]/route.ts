import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { extractToken, verifyToken } from '@/lib/auth';

// PUT update service
export async function PUT(
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
    if (!payload || payload.role !== 'provider') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Check if service belongs to provider
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    if (service.providerId !== payload.userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Not your service' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedService,
    });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE service
export async function DELETE(
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
    if (!payload || payload.role !== 'provider') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Check if service belongs to provider
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    if (service.providerId !== payload.userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Not your service' },
        { status: 403 }
      );
    }

    await Service.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete service' },
      { status: 500 }
    );
  }
}
