export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createAt: Date;
  updatedAt: Date;
}

