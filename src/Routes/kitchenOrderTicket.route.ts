import { Router } from "express";
import { KitchenOrderTicketController } from "../Controllers/kitchenOrderRequest.controller";

export const kitchenOrderTicketRoutes = Router();

kitchenOrderTicketRoutes.post(
  "/create",
  KitchenOrderTicketController.generateKOT
);
kitchenOrderTicketRoutes.get("/all", KitchenOrderTicketController.getAllKOTs);
