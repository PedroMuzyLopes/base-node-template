import { Request, Response } from "express";
import { ReturnAPI } from "../Resources/ReturnApi";
import { RefreshToken } from "../Services/Auth/RefreshToken";

export class RefreshTokenController {
  public static async refreshToken(request: Request, response: Response) {
    try {
      const { refresh_token } = request.body;
      const data = await RefreshToken.refresh(refresh_token);

      return ReturnAPI.success(response, {
        message: "Token obtido",
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
}
