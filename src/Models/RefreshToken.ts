import { UserInterface } from "./UserModel";

export interface RefreshTokenInterface {
  id: String;
  user: UserInterface;
  user_id: String;
  expires_in: Number;
}

export const RefreshTokenVisibleData = {
  id: true,
  user_id: true,
  expires_in: true,
};
