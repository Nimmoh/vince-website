import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

// GET all inquiries
export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new inquiry
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const inquiry = await Inquiry.create(body);
    
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
