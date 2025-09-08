import { Request, Response } from "express";
import { BarOrderTicketService } from "../Services/barOrderTicket.service";
export class BarOrderTicketController {
  static async generateBarOrderTicket(req: Request, res: Response) {
    try {
      const { tableId, stuartId, stuartRequestId, items, status } = req.body;

      const result = await BarOrderTicketService.generateBarOrderTicket(
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

  static async getAllBarOrderTickets(req: Request, res: Response) {
    try {
      const result = await BarOrderTicketService.getAllBarOrderTickets();
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
