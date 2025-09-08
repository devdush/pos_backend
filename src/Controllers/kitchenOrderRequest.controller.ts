import { Request, Response } from "express";
import { KitchenOrderTicketService } from "../Services/kitchenOrderTicket.service";
export class KitchenOrderTicketController {
  static async generateKOT(req: Request, res: Response) {
    try {
      const { tableId, stuartId, stuartRequestId, items, status } = req.body;

      const result = await KitchenOrderTicketService.generateKOT(
        tableId,
        stuartId,
        stuartRequestId,
        items,
        status
      );

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  }

  static async getAllKOTs(req: Request, res: Response) {
    try {
      const result = await KitchenOrderTicketService.getAllKOTs();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  }
}
