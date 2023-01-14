import { Response } from "express";

export interface SuccessInterface {
  message: string | null;
  developerMessage?: string;
  data?: any;
  statusHTTP: number;
}

export interface ErrorInterface extends SuccessInterface {
  exeception?: object | null | object[];
}

export interface MessageReturnInterface extends ErrorInterface {
  error: boolean;
}

export class ReturnAPI {
  // General return with all params
  public static messageReturn(
    response: Response,
    data: MessageReturnInterface
  ): Response {
    return response.status(data.statusHTTP).json(data);
  }

  public static success(response: Response, data: SuccessInterface): Response {
    return this.messageReturn(response, { ...data, error: false });
  }

  public static error(response: Response, data: ErrorInterface): Response {
    return this.messageReturn(response, { ...data, error: true });
  }
}
