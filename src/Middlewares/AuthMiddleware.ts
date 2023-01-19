import { NextFunction, Request, Response } from "express";
import { ReturnAPI } from "../Resources/ReturnApi";

import jwt, { Secret } from "jsonwebtoken";
import { AccessTokenDataInterface } from "../Models/TokenModel";

export class AuthMiddleware {
  public static Authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const jwt_secret = process.env.JWT_SECRET as Secret;
    const headers = request.headers;

    const access_token = headers.authorization?.split("Bearer ")[1];

    if (!access_token)
      return ReturnAPI.error(response, {
        message: "Token de autenticação não encontrado ou inexistente",
        developerMessage: "access token not found",
        statusHTTP: 400,
      });

    jwt.verify(access_token, jwt_secret, (err: any, decode: any) => {
      if (err)
        return ReturnAPI.error(response, {
          message: "Token de autenticação invalido",
          developerMessage: "access token invalid",
          statusHTTP: 401,
        });

      const user_data: AccessTokenDataInterface = decode;
      request.AuthUser = user_data;

      return next();
    });
  }
}
