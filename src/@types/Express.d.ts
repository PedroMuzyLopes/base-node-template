declare namespace Express {
  export interface Request {
    AuthUser?: {
      id: string;
      name: string;
      email: string;
    };
  }
}
