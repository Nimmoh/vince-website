import mongoose, { Schema, model, models } from 'mongoose';

export interface IService {
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceSchema = new Schema<IService>(
  {
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
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Service = models.Service || model<IService>('Service', ServiceSchema);

export default Service;
