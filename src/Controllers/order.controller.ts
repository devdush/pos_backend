import { Request, Response } from "express";
import { OrderService } from "../Services/order.service";

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    const {
      userId,
      stuartOrderId,
      customerId,
      kotIDs,
      botIDs,
      totalAmount,
      payments,
    } = req.body;

    const response = await OrderService.createOrder(
      userId,
      stuartOrderId,
      customerId,
      kotIDs,
      botIDs,
      totalAmount,
      payments
    );

    return res.status(response.success ? 201 : 400).json(response);
  }

  // ✅ Get all orders
  static async getAllOrders(req: Request, res: Response) {
    const response = await OrderService.getAllOrders();
    return res.status(response.success ? 200 : 404).json(response);
  }

  // ✅ Get order by ID
  static async getOrderById(req: Request, res: Response) {
    const { orderId } = req.params;
    const response = await OrderService.getOrderById(orderId);
    return res.status(response.success ? 200 : 404).json(response);
  }

  //   // ✅ Update order payments
  //   static async updateOrderPayments(req: Request, res: Response) {
  //     const { orderId } = req.params;
  //     const { payments } = req.body;
  //     const response = await OrderService.updateOrderPayments(orderId, payments);
  //     return res.status(response.success ? 200 : 400).json(response);
  //   }

  // ✅ Delete order
  static async deleteOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    const response = await OrderService.deleteOrder(orderId);
    return res.status(response.success ? 200 : 404).json(response);
  }
}
