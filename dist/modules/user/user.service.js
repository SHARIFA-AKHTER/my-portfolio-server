"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
const createUser = async (payload) => {
    const existingUser = await db_1.default.user.findUnique({
        where: { email: payload.email },
    });
    if (existingUser) {
        throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    return db_1.default.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            phone: payload.phone,
            role: payload.role || "USER",
        },
    });
};
const getAllUsers = async () => {
    const result = await db_1.default.user.findMany({
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
const getUserById = async (id) => {
    const result = await db_1.default.user.findUnique({
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
const getUserByEmail = async (email) => {
    return db_1.default.user.findUnique({
        where: { email },
    });
};
const updateUser = async (id, payload) => {
    return db_1.default.user.update({
        where: { id },
        data: payload,
    });
};
const deleteUser = async (id) => {
    return db_1.default.user.delete({
        where: { id },
    });
};
exports.UserService = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.service.js.map