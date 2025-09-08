import { Router } from "express";
import { UserController } from "../Controllers/user.controller";

export const usersRoutes = Router();

usersRoutes.post("/register", UserController.register);
usersRoutes.post("/login", UserController.login);