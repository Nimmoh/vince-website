import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { extractToken, verifyToken } from '@/lib/auth';

// GET all users (admin only)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Check authentication
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
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
