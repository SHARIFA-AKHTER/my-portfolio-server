"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("../../utils/jwt");
const bcrypt_1 = require("../../utils/bcrypt");
const db_1 = __importDefault(require("../../config/db"));
const loginWithEmailAndPassword = async (payload) => {
    const { email, password } = payload;
    const user = await db_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("User not found!");
    }
    // password check
    const isMatch = await (0, bcrypt_1.comparePassword)(password, user.password || "");
    if (!isMatch) {
        throw new Error("Invalid credentials!");
    }
    // JWT token generate with role
    const token = (0, jwt_1.signToken)({ id: user.id, email: user.email, role: user.role }, "1d");
    return {
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
// Google Auth (Basic)
const authWithGoogle = async (payload) => {
    const { idToken } = payload;
    if (!idToken) {
        throw new Error("Google idToken required!");
    }
    const googleEmail = "googleuser@example.com";
    const googleName = "Google User";
    // check user exists
    let user = await db_1.default.user.findUnique({
        where: { email: googleEmail },
    });
    if (!user) {
        user = await db_1.default.user.create({
            data: {
                email: googleEmail,
                name: googleName,
                password: await (0, bcrypt_1.hashPassword)("google-auth"),
                phone: "01315909090",
            },
        });
    }
    const token = (0, jwt_1.signToken)({ id: user.id, email: user.email }, "1d");
    return {
        success: true,
        message: "Google auth successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
};
exports.AuthService = {
    loginWithEmailAndPassword,
    authWithGoogle,
};
//# sourceMappingURL=auth.service.js.map