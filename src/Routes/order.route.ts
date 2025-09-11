import { Router } from "express";
import { OrderController } from "../Controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.post("/create", OrderController.createOrder);
orderRoutes.get("/all", OrderController.getAllOrders);
// orderRoutes.get("/:orderId", OrderController.getOrderById);
// orderRoutes.delete("/:orderId", OrderController.deleteOrder);
orderRoutes.get("/this-week", OrderController.getOrdersOfThisWeekDayByDay);
orderRoutes.get(
  "/today-sales-by-category",
  OrderController.getTodaySalesByCategory
);
orderRoutes.get("/today-order-details", OrderController.getTodayOrderDetails);
orderRoutes.get(
  "/this-month-sales-by-category",
  OrderController.getDailyCategoryWiseSalesForCurrentMonth
);
