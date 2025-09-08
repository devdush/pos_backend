import { Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import { uploadToS3 } from "../utils/upload";
import { CategoryService } from "../Services/category.service";
export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    try {
      const { categoryName } = req.body;
      if (!req.files || !req.files.categoryImage) {
        res
          .status(400)
          .json({ success: false, message: "Category image is required" });
        return;
      }

      const file = req.files.categoryImage as expressFileUpload.UploadedFile;

      const s3Url = await uploadToS3(file.data, file.name, file.mimetype);

      const result = await CategoryService.createCategory(categoryName, s3Url);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getAllCategories(req: Request, res: Response) {
    try {
      const result = await CategoryService.getAllCategories();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoryService.getCategoryById(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoryService.deleteCategory(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
