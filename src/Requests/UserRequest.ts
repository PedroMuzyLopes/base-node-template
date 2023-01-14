import { UserInterface } from "../Models/UserModel";
import { MessageReturnInterface } from "../Resources/ReturnApi";

export class UserRequest {
  public static validateStore(store_data: Omit<UserInterface, "id">) {
    if (!store_data.name) {
      return {
        developerMessage: "User name is required",
        message: "nome precisa ser informado",
        statusHTTP: 400,
      } as MessageReturnInterface;
    }

    if (!store_data.email) {
      return {
        error: true,
        developerMessage: "User mail is required",
        message: "email precisa ser informado",
        data: null,
        statusHTTP: 400,
        exeception: null,
      } as MessageReturnInterface;
    }

    if (!store_data.password) {
      return {
        error: true,
        developerMessage: "User password is required",
        message: "senha precisa ser informado",
        data: null,
        statusHTTP: 400,
        exeception: null,
      } as MessageReturnInterface;
    }

    if (store_data.name.length < 3) {
      return {
        error: true,
        developerMessage: "User name need to have at last 3 caracters",
        message: "nome precisa ter pelo menos 3 caracteres",
        data: null,
        statusHTTP: 400,
        exeception: null,
      } as MessageReturnInterface;
    }

    if (store_data.password.length < 8) {
      return {
        error: true,
        developerMessage: "User password need to have at last 8 caracters",
        message: "senha precisa ter pelo menos 8 caracteres",
        data: null,
        statusHTTP: 400,
        exeception: null,
      } as MessageReturnInterface;
    }

    if (!/[A-Z]/.test(store_data.password)) {
      return {
        error: true,
        developerMessage: "User password need to have at last 1 capital letter",
        message: "senha precisa ter pelo menos 1 caracter em maiusculo",
        data: null,
        statusHTTP: 400,
        exeception: null,
      } as MessageReturnInterface;
    }
    if (!/\d/.test(store_data.password)) {
      return {
        error: true,
        developerMessage: "User password need to have at last 1 number",
        message: "senha precisa ter pelo menos 1 numero",
        data: null,
        statusHTTP: 400,
        exeception: null,
      } as MessageReturnInterface;
    }

    return {
      error: false,
      developerMessage: "",
      message: "",
      data: null,
      statusHTTP: 200,
      exeception: null,
    } as MessageReturnInterface;
  }
}
