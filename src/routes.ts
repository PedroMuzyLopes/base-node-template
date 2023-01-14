import express from "express";

import { AuthMiddleware } from "./Middlewares/AuthMiddleware";

import { ReturnAPI } from "./Resources/ReturnApi";
import { authRoutes } from "./Routes/AuthRoutes";
import { userRoutes } from "./Routes/UserRoutes";

export const routes = express.Router();

routes.get("/", async (req, res) => {
  return ReturnAPI.success(res, {
    message: "API functionando...",
    statusHTTP: 200,
  });
});

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
