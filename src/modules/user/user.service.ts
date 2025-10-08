import { Prisma, User } from "@prisma/client";
import prisma from "../../config/db";
import bcrypt from "bcrypt";
// const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
//   const createdUser = await prisma.user.create({
//     data: payload,
//   });
//   return createdUser;
// };

// interface RegisterInput {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
// }

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(payload.password!, 10);

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
const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      status: true,
      blogs: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      status: true,
      blogs: true,
    },
  });
  return result;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const updateUser = async (
  id: number,
  payload: Prisma.UserUpdateInput
): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: payload,
  });
};

const deleteUser = async (id: number): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
