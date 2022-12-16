import express from "express";
import { ReturnAPI } from "./Resources/ReturnApi";

export const routes = express.Router();

routes.get("/", async (req, res) => {
  return ReturnAPI.messageReturn(res, {
    error: false,
    message: "API Funcionando",
    developerMessage: "API Working",
    data: null,
    exeception: null,
    statusHTTP: 200,
  });
});
