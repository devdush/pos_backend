import { Request, Response } from "express";
import { UserService } from "../Services/user.service";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, username, password, role } = req.body;
      const result = await UserService.register(name, username, password, role);
      if (result.success) {
        res
          .status(201)
          .json({ message: result.message, user: result.savedUser });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await UserService.login(username, password);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
