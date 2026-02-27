import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

// GET single service
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const service = await Service.findById(params.id);
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: service });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const service = await Service.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: service });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const service = await Service.findByIdAndDelete(params.id);
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
