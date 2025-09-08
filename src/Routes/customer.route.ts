import { Router } from "express";

import { CustomerController } from "../Controllers/customer.controller";
export const customerRoutes = Router();

customerRoutes.post("/create", CustomerController.createCustomer);
customerRoutes.get("/all", CustomerController.getAllCustomers);
customerRoutes.get("/:id", CustomerController.getCustomerById);
