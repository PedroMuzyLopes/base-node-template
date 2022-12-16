import express from "express";
import { routes } from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`HTTP Server runing in port: ${process.env.PORT}`);
});
