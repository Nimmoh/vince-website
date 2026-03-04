import mongoose, { Schema, model, models } from 'mongoose';

export interface IReview {
  serviceId: string;
  providerId: string;
  customerId: string;
  rating: number;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    serviceId: {
      type: String,
      ref: 'Service',
      required: true,
    },
    providerId: {
      type: String,
      ref: 'User',
      required: true,
    },
    customerId: {
      type: String,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    helpful: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ReviewSchema.index({ serviceId: 1 });
ReviewSchema.index({ providerId: 1 });
ReviewSchema.index({ customerId: 1 });
ReviewSchema.index({ rating: 1 });

const Review = models.Review || model<IReview>('Review', ReviewSchema);

export default Review;
