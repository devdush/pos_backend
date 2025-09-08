import { Router } from "express";
import { OrderController } from "../Controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.post("/create", OrderController.createOrder);
orderRoutes.get("/all", OrderController.getAllOrders);
// orderRoutes.get("/:orderId", OrderController.getOrderById);
// orderRoutes.delete("/:orderId", OrderController.deleteOrder);
