import { Request, Response } from "express";
import { UserRepository } from "../Repositories/UserRepository";
import { ReturnAPI } from "../Resources/ReturnApi";
import { LoginService } from "../Services/Auth/LoginService";
import { RefreshTokenService } from "../Services/Auth/RefreshTokenService";

export interface LoginDataInterface {
  email: string;
  password: string;
}

export class AuthController {
  public static async login(request: Request, response: Response) {
    const loginData: LoginDataInterface = request.body;
    const user = await UserRepository.findByMail(loginData.email);
    if (user) {
      const userData = await UserRepository.getFullData(user.id);
      if (userData) {
        const loginResult = await LoginService.execute(loginData, userData);
        response.cookie("access_token", loginResult.data?.access_token, {
          httpOnly: true,
          maxAge: 86400000,
        });
        response.cookie("refresh_token", loginResult.data?.refresh_token, {
          httpOnly: true,
          maxAge: 86400000,
        });
        return ReturnAPI.success(response, loginResult);
      }
    }
  }

  public static async refreshToken(request: Request, response: Response) {
    try {
      const { refresh_token } = request.body;
      const data = await RefreshTokenService.refresh(refresh_token);

      return ReturnAPI.success(response, {
        message: "Novo token gerado com sucesso",
        data,
        statusHTTP: 200,
      });
    } catch (error: any) {
      return ReturnAPI.error(response, {
        message: "Erro ao atualizar token",
        exeception: error,
        statusHTTP: 500,
      });
    }
  }

  public static async logout(request: Request, response: Response) {
    response.cookie("access_token", "", { maxAge: 1 });
    response.cookie("refresh_token", "", { maxAge: 1 });

    return ReturnAPI.success(response, {
      message: "logout realizado com sucesso",
      developerMessage: "user logout",
      statusHTTP: 200,
    });
  }
}
