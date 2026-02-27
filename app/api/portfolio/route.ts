import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

// GET all portfolio items
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let query: any = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }

    const portfolio = await Portfolio.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: portfolio });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new portfolio item
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const portfolioItem = await Portfolio.create(body);
    
    return NextResponse.json({ success: true, data: portfolioItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
