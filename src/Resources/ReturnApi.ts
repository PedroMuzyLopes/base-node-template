import { Response } from "express";

export interface MessageReturnInterface {
  error: boolean;
  message: string | null;
  developerMessage: string | null;
  exeception: object | null | object[];
  data: any;
  statusHTTP: number;
}

export class ReturnAPI {
  public static messageReturn(res: Response, data: MessageReturnInterface) {
    return res.status(data.statusHTTP).json(data);
  }
}
