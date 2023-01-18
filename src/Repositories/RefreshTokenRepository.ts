import dayjs from "dayjs";

import { prismaClient as prisma } from "../Database/prismaClient";

export class RefreshTokenRepository {
  public static async find(id: string) {
    return await prisma.refreshToken.findFirst({ where: { id } });
  }

  public static async store(user_id: string) {
    await this.deleteByUser(user_id);

    const expires_in = dayjs().add(20, "second").unix();
    const data = { user_id, expires_in };

    const refreshToken = await prisma.refreshToken.create({ data });

    await prisma.$disconnect();

    return refreshToken;
  }

  public static async deleteByUser(user_id: string) {
    await prisma.refreshToken.deleteMany({ where: { user_id } });
    await prisma.$disconnect();
  }
}
