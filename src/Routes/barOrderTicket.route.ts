import { Router } from "express";
import { BarOrderTicketController } from "../Controllers/barOrderTicket.controller";

export const barOrderTicketRoutes = Router();

barOrderTicketRoutes.post(
  "/create",
  BarOrderTicketController.generateBarOrderTicket
);
barOrderTicketRoutes.get(
  "/all",
  BarOrderTicketController.getAllBarOrderTickets
);
