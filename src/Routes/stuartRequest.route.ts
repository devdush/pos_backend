import { Router } from "express";
import { StuartRequestController } from "../Controllers/stuartRequest.controller";

export const stuartRequestRoutes = Router();

stuartRequestRoutes.post("/create", StuartRequestController.createStuartRequest);
stuartRequestRoutes.get("/all", StuartRequestController.getAllStuartRequests);
stuartRequestRoutes.put("/update", StuartRequestController.updateStuartRequestStatus);