import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Inquiry from '@/models/Inquiry';
import Service from '@/models/Service';

// GET dashboard statistics
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Get orders by status
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const confirmedOrders = await Order.countDocuments({ status: 'confirmed' });
    const completedOrders = await Order.countDocuments({ status: 'completed' });
    
    // Get total inquiries
    const totalInquiries = await Inquiry.countDocuments();
    const newInquiries = await Inquiry.countDocuments({ status: 'new' });
    
    // Get total services
    const totalServices = await Service.countDocuments();
    
    // Get unique customers (by phone number)
    const uniqueCustomers = await Order.distinct('customerPhone');
    const totalCustomers = uniqueCustomers.length;
    
    // Get most requested services
    const serviceStats = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.serviceName',
          count: { $sum: '$items.quantity' },
          serviceId: { $first: '$items.serviceId' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber customerName totalAmount status createdAt');
    
    // Calculate revenue (extract numbers from price strings)
    const orders = await Order.find({ status: { $in: ['confirmed', 'completed'] } });
    let totalRevenue = 0;
    orders.forEach(order => {
      const amount = parseFloat(order.totalAmount.replace(/[^0-9.]/g, ''));
      if (!isNaN(amount)) {
        totalRevenue += amount;
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalOrders,
          totalCustomers,
          totalInquiries,
          totalServices,
          totalRevenue: `KSh ${totalRevenue.toLocaleString()}`,
        },
        orders: {
          pending: pendingOrders,
          confirmed: confirmedOrders,
          completed: completedOrders,
        },
        inquiries: {
          total: totalInquiries,
          new: newInquiries,
        },
        topServices: serviceStats,
        recentOrders,
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
