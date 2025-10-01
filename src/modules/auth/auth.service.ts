import prisma from "../../config/db";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { signToken } from "../../utils/jwt";
import { IAuthPayload } from "./auth.interface";


import bcrypt from "bcrypt";
import {  User } from "@prisma/client";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export const register = async (payload: RegisterInput): Promise<User> => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      role: "USER",
    },
  });
};

const login = async ({ email, password }: IAuthPayload) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password); // ✅ এখন string type
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return { token, user };
};


export const AuthService = {
  register,
  login,
};
