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
      items,
      totalAmount,
      payments,
    } = req.body;

    const response = await OrderService.createOrder(
      userId,
      stuartOrderId,
      customerId,
      kotIDs,
      botIDs,
      items,
      totalAmount,
      payments
    );

    return res.status(response.success ? 201 : 400).json(response);
  }

  // ✅ Get all orders
  static async getAllOrders(req: Request, res: Response) {
    const response = await OrderService.getAllOrders();
    res.status(response.success ? 200 : 404).json(response);
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
  static async getOrdersOfThisWeekDayByDay(req: Request, res: Response) {
    try {
      const orders = await OrderService.getOrdersOfThisWeekDayByDay();
      res.status(200).json(orders);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Order retrieval failed", error });
    }
  }
  static async getTodaySalesByCategory(req: Request, res: Response) {
    const result = await OrderService.getTodaySalesByCategory();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  }
  static async getTodayOrderDetails(req: Request, res: Response) {
    const result = await OrderService.getTodayOrderDetails();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  }
  static async getDailyCategoryWiseSalesForCurrentMonth(
    req: Request,
    res: Response
  ) {
    const result =
      await OrderService.getDailyCategoryWiseSalesForCurrentMonth();
    if (result) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  }
}
