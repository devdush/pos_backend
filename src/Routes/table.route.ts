import { Router } from "express";
import { TableController } from "../Controllers/table.controller";

export const tableRoutes = Router();
tableRoutes.post("/create", TableController.createTable);
