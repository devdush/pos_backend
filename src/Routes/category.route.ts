import { Router } from "express";
import { CategoryController } from "../Controllers/cotegory.controller";

export const categoryRoutes = Router();
categoryRoutes.post("/create", CategoryController.createCategory);
categoryRoutes.get("/all", CategoryController.getAllCategories);
categoryRoutes.get("/:id", CategoryController.getCategoryById);
categoryRoutes.delete("/:id", CategoryController.deleteCategory);
