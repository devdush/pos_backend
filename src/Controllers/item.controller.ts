import { Request, Response } from "express";
import { uploadToS3 } from "../utils/upload";
import expressFileUpload from "express-fileupload";
import { ItemService } from "../Services/item.service";
export class ItemController {
  static async createItem(req: Request, res: Response) {
    try {
      const { itemName, price, categoryId, availableQuantity, itemType } =
        req.body;

      if (!req.files || !req.files.productImage) {
        res
          .status(400)
          .json({ success: false, message: "Product image is required" });
        return;
      }

      const file = req.files.productImage as expressFileUpload.UploadedFile;
      const s3Url = await uploadToS3(file.data, file.name, file.mimetype);

      const result = await ItemService.createItem(
        itemName,
        price,
        availableQuantity,
        s3Url,
        itemType,
        categoryId
      );
      if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
      console.error("Error creating item:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getAllItems(req: Request, res: Response) {
    try {
      const result = await ItemService.getAllItems();
      if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Error fetching all items:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getItemById(req: Request, res: Response) {
    try {
      const itemId = req.params.id;
      const result = await ItemService.getItemById(itemId);
      if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Error fetching item by ID:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ItemService.deleteItem(id);
      if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
