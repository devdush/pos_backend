import { Request, Response } from "express";
import { TableService } from "../Services/table.service";

export class TableController {
  static async createTable(req: Request, res: Response) {
    try {
      const { name, status } = req.body;
      const result = await TableService.createTable(name, status);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error in createTable controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getAllTables(req: Request, res: Response) {
    try {
      const result = await TableService.getAllTables();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error in getAllTables controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
