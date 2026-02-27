import mongoose, { Schema, model, models } from 'mongoose';

export interface IOrderItem {
  serviceId: string;
  serviceName: string;
  price: string;
  quantity: number;
}

export interface IOrder {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: IOrderItem[];
  totalAmount: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderItemSchema = new Schema({
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    customerEmail: {
      type: String,
      trim: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: function(v: IOrderItem[]) {
          return v && v.length > 0;
        },
        message: 'At least one item is required'
      }
    },
    totalAmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
