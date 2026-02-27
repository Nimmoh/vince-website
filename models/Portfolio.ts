import mongoose, { Schema, model, models } from 'mongoose';

export interface IPortfolio {
  title: string;
  category: string;
  images: string[];
  description: string;
  location?: string;
  completedDate?: Date;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['shades', 'gazebo', 'pagola', 'gates', 'all'],
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one image is required'
      }
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    location: {
      type: String,
      trim: true,
    },
    completedDate: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = models.Portfolio || model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;
