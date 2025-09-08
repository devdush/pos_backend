import { Order } from "../Models/order.model";

export class OrderService {
  static async createOrder(
    userId: string,
    stuartOrderId: string | null,
    customerId: string | null,
    kotIDs: string[],
    botIDs: string[],
    totalAmount: number,
    payments: { method: string; amount: number; referenceId?: string }[],

  ) {
    try {
      const order = new Order({
        userId,
        stuartOrderId,
        customerId,
        kotIDs,
        botIDs,
        totalAmount,
        payments,

      });

      await order.save();

      if (!order) {
        return { success: false, message: "Order creation failed" };
      }

      return {
        success: true,
        message: "Order created successfully",
        order,
      };
    } catch (error) {
      return { success: false, message: "Order creation failed", error };
    }
  }

  static async getAllOrders() {
    try {   
      const orders = await Order.find()
        .populate([
          { path: "userId", select: "name" },
          { path: "stuartOrderId"},
          { path: "customerId", select: "name phone" },
          { path: "kotIDs", select: "id" },
          { path: "botIDs", select: "id" },
        ])
        .sort({ createdAt: -1 });

      if (!orders || orders.length === 0) {
        return { success: false, message: "No orders found" };
      }

      return {
        success: true,
        message: "Orders retrieved successfully",
        orders,
      };
    } catch (error) {
      return { success: false, message: "Order retrieval failed", error };
    }
  }

  static async getOrderById(orderId: string) {
    try {
      const order = await Order.findById(orderId).populate([
        { path: "userId", select: "name email" },
        { path: "stuartOrderId" },
        { path: "customerId", select: "name phone" },
        { path: "kotIDs" },
        { path: "botIDs" },
      ]);

      if (!order) {
        return { success: false, message: "Order not found" };
      }

      return {
        success: true,
        message: "Order retrieved successfully",
        order,
      };
    } catch (error) {
      return { success: false, message: "Order retrieval failed", error };
    }
  }

  //   // ✅ Update order payments (for split payments)
  //   static async updateOrderPayments(
  //     orderId: string,
  //     payments: { method: string; amount: number; referenceId?: string }[]
  //   ) {
  //     try {
  //       const order = await Order.findByIdAndUpdate(
  //         orderId,
  //         { payments },
  //         { new: true }
  //       );

  //       if (!order) {
  //         return { success: false, message: "Order not found" };
  //       }

  //       return {
  //         success: true,
  //         message: "Payments updated successfully",
  //         order,
  //       };
  //     } catch (error) {
  //       return { success: false, message: "Payment update failed", error };
  //     }
  //   }

  static async deleteOrder(orderId: string) {
    try {
      const order = await Order.findByIdAndDelete(orderId);

      if (!order) {
        return { success: false, message: "Order not found" };
      }

      return {
        success: true,
        message: "Order deleted successfully",
      };
    } catch (error) {
      return { success: false, message: "Order deletion failed", error };
    }
  }
}
