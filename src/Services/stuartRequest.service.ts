import mongoose from "mongoose";
import { StuartOrder } from "../Models/stuartRequest.model";

export class StuartRequestService {
  static async createStuartRequest(
    stuartId: string,
    tableId: string,
    items: { productId: string; quantity: number }[],
    totalAmount: number,
    status: string
  ) {
    try {
      const newRequest = await StuartOrder.create({
        stuartId,
        tableId,
        items,
        totalAmount,
        status,
      });
      if (!newRequest) {
        return { success: false, message: "Failed to create Stuart request" };
      }
      await newRequest.populate([
        // { path: "stuartId" },
        // { path: "tableId" },
        { path: "items.productId" },
      ]);
      return {
        success: true,
        data: newRequest,
        message: "Stuart request created successfully",
      };
    } catch (error) {
      console.error("Error creating Stuart request:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async getAllStuartRequests() {
    try {
      const orders = await StuartOrder.find()
        .populate("stuartInfo")
        .populate("tableInfo")
        .populate("productsInfo")
        .sort({ createdAt: -1 });
      if (!orders) {
        return { success: false, message: "No Stuart orders found" };
      } else {
        return { success: true, data: orders };
      }
    } catch (error) {
      console.error("Error fetching Stuart orders:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async updateStuartRequest(
    orderId: string,
    updates: {
      items?: { productId: string; quantity: number }[];
      totalAmount?: number;
      status?: string;
    }
  ) {
    try {
      const order = await StuartOrder.findById(orderId);
      if (!order) {
        return { success: false, message: "Stuart order not found" };
      }
      if (updates.items && updates.items.length > 0) {
        updates.items.forEach((newItem) => {
          order.items.push({
            productId: new mongoose.Types.ObjectId(newItem.productId),
            quantity: newItem.quantity,
          });
        });
      }
      if (updates.totalAmount !== undefined) {
        order.totalAmount = updates.totalAmount;
      }
      if (updates.status) {
        order.status = updates.status;
      }
      const updatedOrder = await order.save();

      return {
        success: true,
        data: updatedOrder,
        message: "Stuart request updated successfully",
      };
    } catch (error) {
      console.error("Error updating Stuart request:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async deleteStuartRequest(orderId: string) {
    try {
      const result = await StuartOrder.findByIdAndDelete(orderId);
      if (!result) {
        return { success: false, message: "Stuart order not found" };
      }
      return { success: true, message: "Stuart order deleted successfully" };
    } catch (error) {
      console.error("Error deleting Stuart order:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async getStuartRequestByTableIdAndStuartID(
    stuartId: string,
    tableId: string
  ) {
    try {
      const result = await StuartOrder.findOne({
        tableId,
        stuartId,
        status: "pending",
      })
        .select("items.quantity totalAmount") 
        .populate({
          path: "items.productId",
          select: "itemName price",
        });

      if (!result) {
        return { success: false, message: "No active order found" };
      }

      return { success: true, data: result };
    } catch (error) {
      console.error("Error fetching Stuart request:", error);
      return { success: false, message: "Internal server error" };
    }
  }
}
