export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export const UserVisibleData = {
  id: true,
  email: true,
  name: true,
  deleted: true,
  createdAt: true,
  updatedAt: true,
};
