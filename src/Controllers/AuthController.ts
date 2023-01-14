import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";
import { UserRepository } from "../Repositories/UserRepository";
import { UserInterface } from "../Models/UserModel";
import { ReturnAPI } from "../Resources/ReturnApi";
import { LoginService } from "../Services/Auth/LoginService";

const prisma = new PrismaClient();

export interface LoginDataInterface {
  email: string;
  password: string;
}

export class AuthController {
  public static async login(req: Request, res: Response) {
    const loginData: LoginDataInterface = req.body;
    const user = await UserRepository.findByMail(loginData.email);
    if (user) {
      const userData = await UserRepository.getFullData(user.id);
      if (userData) {
        const loginResult = await LoginService.execute(loginData, userData);
        res.cookie("access_token", loginResult.data?.token, {
          httpOnly: true,
          maxAge: 3600000,
        });
        return ReturnAPI.messageReturn(res, loginResult);
      }
    }
  }

  public static async logout(req: Request, res: Response) {
    res.cookie("access_token", "", { maxAge: 1 });
    return ReturnAPI.messageReturn(res, {
      error: false,
      message: "logout realizado com sucesso",
      developerMessage: "user logout",
      exeception: null,
      data: null,
      statusHTTP: 200,
    });
  }
}
