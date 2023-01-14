import { NextFunction, Request, Response } from "express";
import { ReturnAPI } from "../Resources/ReturnApi";

import jwt, { Secret } from "jsonwebtoken";

export class AuthMiddleware {
  public static Authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const jwt_secret = process.env.JWT_SECRET as Secret;

    const access_token = request.cookies.access_token;

    if (!access_token) {
      return ReturnAPI.error(response, {
        message: "Token de autenticação não encontrado ou inexistente",
        developerMessage: "access token not found",
        statusHTTP: 401,
      });
    }

    jwt.verify(access_token, jwt_secret, (err: any, decode: any) => {
      if (err) {
        return ReturnAPI.error(response, {
          message: "Token de autenticação invalido",
          developerMessage: "access token invalid",
          statusHTTP: 401,
        });
      }

      request.AuthUser = decode;

      return next();
    });
  }
}
