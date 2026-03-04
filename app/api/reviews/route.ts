import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import User from '@/models/User';
import { extractToken, verifyToken } from '@/lib/auth';

// GET reviews for a service
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');
    const providerId = searchParams.get('providerId');

    const filter: any = {};
    if (serviceId) filter.serviceId = serviceId;
    if (providerId) filter.providerId = providerId;

    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    // Get customer info for each review
    const reviewsWithCustomers = await Promise.all(
      reviews.map(async (review) => {
        const customer = await User.findById(review.customerId).select('profile.name');
        return {
          ...review.toObject(),
          customerName: customer?.profile?.name || 'Anonymous',
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: reviewsWithCustomers,
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST create review
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
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId, providerId, rating, comment } = body;

    if (!serviceId || !providerId || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this service
    const existingReview = await Review.findOne({
      serviceId,
      customerId: payload.userId,
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this service' },
        { status: 400 }
      );
    }

    const review = await Review.create({
      serviceId,
      providerId,
      customerId: payload.userId,
      rating,
      comment,
      helpful: 0,
    });

    // Update provider rating
    const allReviews = await Review.find({ providerId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    await User.findByIdAndUpdate(providerId, {
      $set: {
        'providerInfo.rating': Math.round(avgRating * 10) / 10,
        'providerInfo.totalReviews': allReviews.length,
      },
    });

    return NextResponse.json({
      success: true,
      data: review,
    });
  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}
