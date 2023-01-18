import dayjs from "dayjs";
import { RefreshTokenRepository } from "../../Repositories/RefreshTokenRepository";
import { AccessTokenService } from "./AccessTokenService";

export class RefreshTokenService {
  public static async execute(refresh_token: string) {
    let refreshToken = await RefreshTokenRepository.find(refresh_token);

    if (!refreshToken) {
      throw new Error("Refresh token invalid");
    }

    const access_token = await AccessTokenService.execute(refreshToken.user_id);

    return access_token;
  }

  public static async refresh(refresh_token: string) {
    const refreshToken = await RefreshTokenRepository.find(refresh_token);

    if (!refreshToken) throw new Error("Refresh token invalid");

    const access_token = await AccessTokenService.execute(refreshToken.user_id);

    const expiredRefreshToken = dayjs().isAfter(
      dayjs.unix(refreshToken.expires_in)
    );

    if (expiredRefreshToken) {
      const newRefreshToken = await RefreshTokenRepository.store(
        refreshToken.user_id
      );
      return { access_token, refresh_token: newRefreshToken.id };
    }

    return { access_token };
  }
}
