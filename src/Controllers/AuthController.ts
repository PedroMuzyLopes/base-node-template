import { Request, Response } from "express";
import { RefreshTokenRepository } from "../Repositories/RefreshTokenRepository";
import { UserRepository } from "../Repositories/UserRepository";
import { ReturnAPI } from "../Resources/ReturnApi";
import { AccessTokenDataInterface } from "../Models/TokenModel";
import { LoginService } from "../Services/Auth/LoginService";
import { RefreshToken } from "../Services/Auth/RefreshToken";

export interface LoginDataInterface {
  email: string;
  password: string;
}

export class AuthController {
  public static async login(request: Request, response: Response) {
    const loginData: LoginDataInterface = request.body;

    try {
      const user = await UserRepository.findByMail(loginData.email);
      if (user) {
        const userData = await UserRepository.getFullData(user.id);
        if (userData) {
          const loginResult = await LoginService.execute(loginData, userData);
          return ReturnAPI.success(response, loginResult);
        } else throw new Error("User not found");
      }
    } catch (error: any) {
      return ReturnAPI.error(response, {
        message: "Erro ao realizar login",
        exeception: error,
        statusHTTP: 500,
      });
    }
  }

  public static async logout(request: Request, response: Response) {
    try {
      const user = request.AuthUser as AccessTokenDataInterface;
      await RefreshTokenRepository.deleteByUser(user.id);

      return ReturnAPI.success(response, {
        message: "logout realizado com sucesso",
        developerMessage: "user logout",
        statusHTTP: 200,
      });
    } catch (error) {
      return ReturnAPI.error(response, {
        message: "Erro ao fazer logout",
        statusHTTP: 500,
      });
    }
  }
}
