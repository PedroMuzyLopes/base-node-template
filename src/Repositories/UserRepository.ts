import { prismaClient as prisma } from "../Database/prismaClient";
import bcrypt from "bcrypt";
import { UserInterface, UserVisibleData } from "../Models/UserModel";

export class UserRepository {
  public static async find(user_id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: UserVisibleData,
    });

    async () => {
      await prisma.$disconnect();
    };

    return user;
  }

  public static async findByMail(userMail: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: userMail,
      },
      select: UserVisibleData,
    });

    async () => {
      await prisma.$disconnect();
    };

    return user;
  }

  public static async store(user: Omit<UserInterface, "id">) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: passwordHash,
        name: user.name,
      },
      select: UserVisibleData,
    });

    async () => {
      await prisma.$disconnect();
    };

    return newUser;
  }

  public static async update(user: Omit<UserInterface, "password" | "email">) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
      },
      select: UserVisibleData,
    });

    async () => {
      await prisma.$disconnect();
    };

    return updatedUser;
  }

  public static async delete(user_id: string) {
    const deletedUser = await prisma.user.delete({
      where: {
        id: user_id,
      },
      select: UserVisibleData,
    });

    async () => {
      await prisma.$disconnect();
    };

    return deletedUser;
  }

  public static async disable(user_id: string) {
    const deletedUser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        deleted: true,
      },
      select: UserVisibleData,
    });

    async () => {
      await prisma.$disconnect();
    };

    return deletedUser;
  }

  public static async enable(user_id: string) {
    const enableuser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        deleted: false,
      },
      select: UserVisibleData,
    });

    async () => {
      await prisma.$disconnect();
    };

    return enableuser;
  }

  public static async findAll() {
    const users = await prisma.user.findMany({
      where: {
        deleted: false,
      },
      select: UserVisibleData,
    });

    async () => {
      await prisma.$disconnect();
    };

    return users;
  }

  public static async getFullData(user_id: string) {
    const userData = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        deleted: true,
        created_at: true,
        updated_at: true,
      },
    });

    async () => {
      await prisma.$disconnect();
    };

    return userData;
  }
}
