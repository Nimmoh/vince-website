import mongoose, { Schema, model, models } from 'mongoose';

export interface IService {
  providerId?: string; // Reference to User (provider)
  name: string;
  category: string;
  subcategory?: string;
  price: string;
  priceNegotiable?: boolean;
  description: string;
  image?: string;
  images?: string[]; // Multiple images support
  location?: {
    county: string;
    city: string;
    coordinates?: [number, number];
  };
  status: 'pending' | 'approved' | 'rejected' | 'inactive';
  featured?: boolean;
  featuredExpiry?: Date;
  views?: number;
  contactCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    providerId: {
      type: String,
      ref: 'User',
      // Optional for backward compatibility with existing services
    },
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['shades', 'gazebo', 'pagola', 'gates'],
    },
    subcategory: {
      type: String,
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    priceNegotiable: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    location: {
      county: String,
      city: String,
      coordinates: [Number],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'inactive'],
      default: 'approved', // Auto-approve for backward compatibility
    },
    featured: {
      type: Boolean,
      default: false,
    },
    featuredExpiry: {
      type: Date,
    },
    views: {
      type: Number,
      default: 0,
    },
    contactCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ServiceSchema.index({ providerId: 1 });
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ status: 1 });
ServiceSchema.index({ featured: 1 });
ServiceSchema.index({ 'location.county': 1 });

const Service = models.Service || model<IService>('Service', ServiceSchema);

export default Service;
