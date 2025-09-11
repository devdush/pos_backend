import { Router } from "express";
import { StuartRequestController } from "../Controllers/stuartRequest.controller";

export const stuartRequestRoutes = Router();

stuartRequestRoutes.post(
  "/create",
  StuartRequestController.createStuartRequest
);
stuartRequestRoutes.post(
  "/get-pending-by-tableId-and-stuartId",
  StuartRequestController.getStuartRequestByTableIdAndStuartID
);
stuartRequestRoutes.get("/all", StuartRequestController.getAllStuartRequests);
stuartRequestRoutes.put(
  "/update",
  StuartRequestController.updateStuartRequestStatus
);
stuartRequestRoutes.delete(
  "/delete/:id",
  StuartRequestController.deleteStuartRequest
);
