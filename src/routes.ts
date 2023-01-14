import express from "express";
import { ReturnAPI } from "./Resources/ReturnApi";

export const routes = express.Router();

routes.get("/", async (req, res) => {
  return ReturnAPI.success(res, {
    message: "API Funcionando",
    statusHTTP: 200,
  });
});
