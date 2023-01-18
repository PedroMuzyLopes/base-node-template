import express from "express";
import { AuthController } from "../Controllers/AuthController";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

export const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/refresh-token", AuthController.refreshToken);
authRoutes.get("/logout", AuthMiddleware.Authenticate, AuthController.logout);
