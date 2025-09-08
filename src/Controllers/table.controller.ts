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
  static async getTableById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await TableService.getTableById(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in getTableById controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async updateTableStatus(req: Request, res: Response) {
    try {
      const { id, status } = req.body;
      const result = await TableService.updateTableStatus(id, status);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in updateTableStatus controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async deleteTable(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await TableService.deleteTable(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in deleteTable controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
