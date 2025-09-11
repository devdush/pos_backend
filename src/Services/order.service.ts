import { Category } from "../Models/category.model";
import { Order } from "../Models/order.model";
import { ItemService } from "./item.service";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
export class OrderService {
  static async createOrder(
    userId: string,
    stuartOrderId: string | null,
    customerId: string | null,
    kotIDs: string[],
    botIDs: string[],
    items: { productId: string; quantity: number }[],
    totalAmount: number,
    payments: { method: string; amount: number; referenceId?: string }[]
  ) {
    try {
      const order = new Order({
        userId,
        stuartOrderId,
        customerId,
        kotIDs,
        botIDs,
        items,
        totalAmount,
        payments,
      });
      await order.save();
      const updateResult = await ItemService.updateItemsAfterOrder(items);

      if (!updateResult.success) {
        return { success: false, message: "Failed to update item quantities" };
      }
      if (!order) {
        return { success: false, message: "Order creation failed" };
      }
      return {
        success: true,
        message: "Order created successfully",
        order,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Order creation failed", error };
    }
  }

  static async getAllOrders() {
    try {
      const orders = await Order.find()
        .populate([
          { path: "userId", select: "name" },
          { path: "stuartOrderId" },
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
  static async getOrdersOfThisWeekDayByDay() {
    try {
      const today = new Date();

      // Start of week (Sunday)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      // End of week (next Sunday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      // Aggregate orders by day of week
      const orders = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfWeek, $lt: endOfWeek },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" }, // Sunday=1, Saturday=7
            totalSales: { $sum: "$totalAmount" },
            totalOrders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      // Map Mongo day numbers → readable day names
      const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const fullWeek = daysMap.map((day, i) => {
        const found = orders.find((o) => o._id === i + 1);
        return {
          day,
          sales: found ? found.totalSales : 0,
          orders: found ? found.totalOrders : 0,
        };
      });

      return { success: true, data: fullWeek, message: "Weekly sales fetched" };
    } catch (error) {
      console.error("Error fetching weekly sales:", error);
      return { success: false, error: "Failed to fetch weekly sales" };
    }
  }
  static async getTodaySalesByCategory() {
    try {
      // Get today's start and end time
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const result = await Order.aggregate([
        {
          $match: {
            date: { $gte: startOfDay, $lte: endOfDay }, // Only today’s orders
          },
        },
        { $unwind: "$items" }, // Break array of items into separate docs
        {
          $lookup: {
            from: "items", // collection name in MongoDB (usually lowercase + plural)
            localField: "items.productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $lookup: {
            from: "categories",
            localField: "product.categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $group: {
            _id: "$category.categoryName",
            value: {
              $sum: { $multiply: ["$items.quantity", "$product.price"] }, // qty * price
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: 1,
          },
        },
      ]);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error fetching category sales:", error);
      return { success: false, error: "Failed to fetch category sales" };
    }
  }
  static async getTodayOrderDetails() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const orders = await Order.aggregate([
        {
          $match: {
            date: { $gte: today },
          },
        },
        {
          $project: {
            totalAmount: 1,
            itemsCount: { $size: "$items" }, // count items per order
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalAmount" },
            totalOrders: { $sum: 1 },
            totalItems: { $sum: "$itemsCount" }, // sum them up
          },
        },
      ]);

      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching today's orders:", error);
      return { success: false, error: "Failed to fetch today's orders" };
    }
  }
  static async getDailyCategoryWiseSalesForCurrentMonth() {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    // Get list of all dates in current month
    const allDates = eachDayOfInterval({ start, end }).map((date) =>
      format(date, "yyyy-MM-dd")
    );

    // Get all categories
    const categories = await Category.find({}, { categoryName: 1 }).lean();
    const categoryNames = categories.map((c) => c.categoryName);

    // Get actual sales data
    const rawData = await Order.aggregate([
      { $match: { date: { $gte: start, $lte: end } } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "items",
          localField: "items.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "categories",
          localField: "product.categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            category: "$category.categoryName",
          },
          totalSales: {
            $sum: {
              $multiply: ["$items.quantity", "$product.price"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          categories: {
            $push: {
              category: "$_id.category",
              sales: "$totalSales",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          categories: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    // Convert rawData into a Map for faster lookup
    const dataMap = new Map<string, Record<string, number>>();
    for (const entry of rawData) {
      const salesMap: Record<string, number> = {};
      for (const name of categoryNames) {
        salesMap[name] = 0;
      }
      for (const cat of entry.categories) {
        salesMap[cat.category] = cat.sales;
      }
      dataMap.set(entry.date, salesMap);
    }

    // Create final result with all dates, filling missing ones with 0s
    const result = allDates.map((date) => {
      const sales =
        dataMap.get(date) ||
        Object.fromEntries(categoryNames.map((name) => [name, 0]));
      return { date, ...sales };
    });

    return { success: true, data: result };
  }
}
