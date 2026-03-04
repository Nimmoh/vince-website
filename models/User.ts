import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  role: 'customer' | 'provider' | 'admin';
  profile: {
    name: string;
    phone: string;
    photo?: string;
    bio?: string;
    location?: {
      county: string;
      city: string;
      coordinates?: [number, number];
    };
  };
  providerInfo?: {
    businessName: string;
    verified: boolean;
    rating: number;
    totalReviews: number;
    joinedDate: Date;
    subscription: 'free' | 'basic' | 'premium';
    subscriptionExpiry?: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['customer', 'provider', 'admin'],
      default: 'customer',
    },
    profile: {
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Phone is required'],
      },
      photo: String,
      bio: String,
      location: {
        county: String,
        city: String,
        coordinates: [Number],
      },
    },
    providerInfo: {
      businessName: String,
      verified: {
        type: Boolean,
        default: false,
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
      joinedDate: {
        type: Date,
        default: Date.now,
      },
      subscription: {
        type: String,
        enum: ['free', 'basic', 'premium'],
        default: 'free',
      },
      subscriptionExpiry: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'providerInfo.verified': 1 });

const User = models.User || model<IUser>('User', UserSchema);

export default User;
