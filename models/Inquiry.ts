import mongoose, { Schema, model, models } from 'mongoose';

export interface IInquiry {
  name: string;
  phone: string;
  email?: string;
  serviceName?: string;
  message: string;
  status?: string;
  createdAt?: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      trim: true,
    },
    serviceName: {
      type: String,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'completed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = models.Inquiry || model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
