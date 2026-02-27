import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

// GET all services
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query: any = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const services = await Service.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new service
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const service = await Service.create(body);
    
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
