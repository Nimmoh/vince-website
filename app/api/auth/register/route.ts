import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, name, phone, role, businessName } = body;

    // Validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userData: any = {
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'customer',
      profile: {
        name,
        phone,
      },
    };

    // Add provider info if registering as provider
    if (role === 'provider') {
      userData.providerInfo = {
        businessName: businessName || name,
        verified: false,
        rating: 0,
        totalReviews: 0,
        joinedDate: new Date(),
        subscription: 'free',
      };
    }

    const user = await User.create(userData);

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.profile.name,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
