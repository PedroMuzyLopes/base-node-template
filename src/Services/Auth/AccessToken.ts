import jwt, { Secret } from "jsonwebtoken";
import { AccessTokenDataInterface } from "../../Models/TokenModel";
import { UserRepository } from "../../Repositories/UserRepository";

export class AccessToken {
  public static async execute(user_id: string) {
    try {
      const user = await UserRepository.find(user_id);
      if (!user) throw new Error("User not found");

      const jwt_secret = process.env.JWT_SECRET;

      const jwt_data = {
        id: user.id,
        name: user.name,
        email: user.email,
      } as AccessTokenDataInterface;

      return jwt.sign(jwt_data, jwt_secret as Secret, { expiresIn: "15s" });
    } catch (error) {
      throw new Error("Error while generating access token");
    }
  }
}
