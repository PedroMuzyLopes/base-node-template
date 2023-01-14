import { NextFunction, Request, Response } from "express";
import { ReturnAPI } from "../Resources/ReturnApi";

import jwt, { Secret } from "jsonwebtoken";

export class AuthMiddleware {
  public static Authenticate(req: Request, res: Response, next: NextFunction) {
    const jwt_secret = process.env.JWT_SECRET as Secret;

    const access_token = req.cookies.access_token;

    if (!access_token) {
      return ReturnAPI.messageReturn(res, {
        error: false,
        message: "Token de autenticação não encontrado ou inexistente",
        developerMessage: "access token not found",
        exeception: null,
        data: null,
        statusHTTP: 401,
      });
    }

    jwt.verify(access_token, jwt_secret, (err: any, decode: any) => {
      if (err) {
        return ReturnAPI.messageReturn(res, {
          error: false,
          message: "Token de autenticação invalido",
          developerMessage: "access token invalid",
          exeception: null,
          data: err,
          statusHTTP: 401,
        });
      }

      req.AuthUser = decode;

      return next();
    });
  }
}
