import bcrypt from "bcrypt";
import { LoginDataInterface } from "../../Controllers/AuthController";
import { UserInterface } from "../../Models/UserModel";
import { ErrorInterface, SuccessInterface } from "../../Resources/ReturnApi";
import { RefreshToken } from "./RefreshToken";
import { RefreshTokenRepository } from "../../Repositories/RefreshTokenRepository";

export class LoginService {
  public static async execute(
    loginData: LoginDataInterface,
    userData: UserInterface
  ) {
    try {
      const checkPassword = await bcrypt.compare(
        loginData.password,
        userData.password
      );

      if (!checkPassword)
        return {
          message: "Senha invalida",
          developerMessage: "invalid password",
          statusHTTP: 424,
        } as ErrorInterface;

      const refresh_token = await RefreshTokenRepository.store(userData.id);
      const access_token = await RefreshToken.execute(refresh_token.id);

      return {
        message: "Login realizado com sucesso!",
        data: {
          access_token: access_token,
          refresh_token: refresh_token.id,
        },
        statusHTTP: 200,
      } as SuccessInterface;
    } catch (error) {
      return {
        message: "Erro ao logar",
        exeception: error,
        statusHTTP: 500,
      } as ErrorInterface;
    }
  }
}
