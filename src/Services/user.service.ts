import bcrypt from "bcryptjs";
import { User } from "../Models/user.model";
import jwt from "jsonwebtoken";
export class UserService {
  static async register(
    name: string,
    username: string,
    password: string,
    role: "cashier" | "admin" | "stuart"
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        username,
        password: hashedPassword,
        role,
      });
      const savedUser = await newUser.save();
      return {
        success: true,
        savedUser,
        message: "User registered successfully",
      };
    } catch (error) {
      return { success: false, message: "Registration failed", error };
      console.error("Error registering user:", error);
    }
  }
  static async login(username: string, password: string) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return { success: false, message: "User not found" };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, message: "Invalid password" };
      }
      const token = jwt.sign(
        { id: user._id, role: user.role, username: user.username },
        process.env.JWT_ACCESS_SECRET || "youraccesssecret",
        { expiresIn: "1h" }
      );
      return { success: true, message: "Login successful", token };
    } catch (error) {
      return { success: false, message: "Login failed", error };
    }
  }
}
