import express from "express";
import { UserController } from "../Controllers/UserController";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

export const userRoutes = express.Router();

userRoutes.get("/", AuthMiddleware.Authenticate, UserController.findAll);

userRoutes.get("/:id", AuthMiddleware.Authenticate, UserController.find);

userRoutes.post("/", UserController.create);

userRoutes.put("/:id", AuthMiddleware.Authenticate, UserController.update);

userRoutes.delete("/:id", AuthMiddleware.Authenticate, UserController.delete);
