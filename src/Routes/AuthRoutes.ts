import express from "express";
import { AuthController } from "../Controllers/AuthController";
import { RefreshTokenController } from "../Controllers/RefreshTokenController";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

export const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/refresh-token", RefreshTokenController.refreshToken);
authRoutes.get("/logout", AuthMiddleware.Authenticate, AuthController.logout);
