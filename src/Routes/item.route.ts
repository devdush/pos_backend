import { Router } from "express";
import { ItemController } from "../Controllers/item.controller";

export const itemRoutes = Router();

itemRoutes.post("/create", ItemController.createItem);
itemRoutes.get("/all", ItemController.getAllItems);
itemRoutes.get("/:id", ItemController.getItemById);
itemRoutes.delete("/delete/:id", ItemController.deleteItem);
