import { Request, Response } from "express";
import { StuartRequestService } from "../Services/stuartRequest.service";
export class StuartRequestController {
  static async createStuartRequest(req: Request, res: Response) {
    try {
      const { stuartId, tableId, items, totalAmount, status } = req.body;
      const result = await StuartRequestService.createStuartRequest(
        stuartId,
        tableId,
        items,
        totalAmount,
        status
      );
      if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
      console.error("Error creating Stuart request:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getAllStuartRequests(req: Request, res: Response) {
    try {
      const result = await StuartRequestService.getAllStuartRequests();
      if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Error fetching all Stuart requests:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async updateStuartRequestStatus(req: Request, res: Response) {
    try {
      const { id, updates } = req.body;
      const result = await StuartRequestService.updateStuartRequest(
        id,
        updates
      );
      if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Error updating Stuart request status:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
