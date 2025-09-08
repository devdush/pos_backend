import { Request, Response } from "express";
import { CustomerService } from "../Services/customer.service";
export class CustomerController {
  static async createCustomer(req: Request, res: Response) {
    try {
      const { name, phone } = req.body;
      const result = await CustomerService.createCustomer(name, phone);
      if (!result.success) {
        return res.status(400).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: (error as Error).message });
    }
  }
  static async getAllCustomers(req: Request, res: Response) {
    try {
      const result = await CustomerService.getAllCustomers();
      if (result.success) {
        return res.status(200).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: (error as Error).message });
    }
  }
  static async getCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await CustomerService.getCustomerById(id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: (error as Error).message });
    }
  }
}
