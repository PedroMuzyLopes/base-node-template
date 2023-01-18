import jwt, { Secret } from "jsonwebtoken";
import { UserRepository } from "../../Repositories/UserRepository";

export class AccessTokenService {
  public static async execute(user_id: string) {
    const user = await UserRepository.find(user_id);
    if (!user) throw new Error("User not found");

    const jwt_secret = process.env.JWT_SECRET;

    const jwt_data = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    };

    return jwt.sign(jwt_data, jwt_secret as Secret, { expiresIn: "20s" });
  }
}
