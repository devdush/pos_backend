import { Router } from "express";
import { TableController } from "../Controllers/table.controller";

export const tableRoutes = Router();
tableRoutes.post("/create", TableController.createTable);
tableRoutes.get("/all", TableController.getAllTables);
tableRoutes.get("/:id", TableController.getTableById);
tableRoutes.put("/update-status", TableController.updateTableStatus);
tableRoutes.delete("/delete", TableController.deleteTable);