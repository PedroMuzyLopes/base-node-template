import { Request, Response } from "express";

import { UserInterface } from "../Models/UserModel";
import { UserRepository } from "../Repositories/UserRepository";

import { UserRequest } from "../Requests/UserRequest";
import { ReturnAPI } from "../Resources/ReturnApi";

export class UserController {
  public static async create(request: Request, response: Response) {
    const user: Omit<UserInterface, "id"> = request.body;

    const validate_data = UserRequest.validateStore(user);

    if (validate_data.error) {
      return ReturnAPI.error(response, validate_data);
    }

    const newUser = await UserRepository.store(user);

    return ReturnAPI.success(response, {
      message: "Usuário cadastrado com sucesso",
      developerMessage: "user created",
      data: newUser,
      statusHTTP: 201,
    });
  }

  public static async find(request: Request, response: Response) {
    const userId = request.params.id;

    const user = await UserRepository.find(userId);

    if (user)
      return ReturnAPI.success(response, {
        message: "Usuário encontrado",
        data: user,
        statusHTTP: 200,
      });
    else
      return ReturnAPI.error(response, {
        message: "Usuário não encontrado",
        statusHTTP: 400,
      });
  }

  public static async findAll(request: Request, response: Response) {
    const users = await UserRepository.findAll();

    return ReturnAPI.success(response, {
      message: "Usuários encontrados",
      data: users,
      statusHTTP: 200,
    });
  }

  public static async update(request: Request, response: Response) {
    const user: Omit<UserInterface, "password" | "email"> = {
      id: request.params.id,
      name: request.body.name,
    };

    const updateUser = await UserRepository.update(user);

    return ReturnAPI.success(response, {
      message: "Usuário atualizado",
      developerMessage: "users updated",
      statusHTTP: 200,
    });
  }

  public static async delete(request: Request, response: Response) {
    const user = await UserRepository.delete(request.params.id);

    return ReturnAPI.success(response, {
      message: "Usuário deletado",
      developerMessage: "users deleted",
      statusHTTP: 200,
    });
  }

  public static async disable(request: Request, response: Response) {
    const user = await UserRepository.disable(request.params.id);

    return ReturnAPI.messageReturn(response, {
      error: false,
      message: "Usuário deletado",
      developerMessage: "users deleted",
      exeception: null,
      data: null,
      statusHTTP: 200,
    });
  }

  public static async enable(request: Request, response: Response) {
    const user = await UserRepository.enable(request.params.id);

    return ReturnAPI.success(response, {
      message: "usuário deletado",
      developerMessage: "user deleted",
      statusHTTP: 200,
    });
  }
}
