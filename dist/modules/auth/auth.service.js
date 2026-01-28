"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.authWithFacebook = exports.authWithGoogle = void 0;
const jwt_1 = require("../../utils/jwt");
const bcrypt_1 = require("../../utils/bcrypt");
const db_1 = __importDefault(require("../../config/db"));
const google_auth_library_1 = require("google-auth-library");
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
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const authWithGoogle = async (payload) => {
    var _a;
    const { token } = payload;
    if (!token)
        throw new Error("Google token missing");
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const google = ticket.getPayload();
    const email = google === null || google === void 0 ? void 0 : google.email;
    const name = (google === null || google === void 0 ? void 0 : google.name) ||
        ((_a = google === null || google === void 0 ? void 0 : google.email) === null || _a === void 0 ? void 0 : _a.split("@")[0]) ||
        "Google User";
    const picture = (google === null || google === void 0 ? void 0 : google.picture) || null;
    if (!email)
        throw new Error("Google email not found");
    let user = await db_1.default.user.findUnique({ where: { email } });
    if (!user) {
        user = await db_1.default.user.create({
            data: {
                email,
                name,
                picture: picture,
                password: "google-auth",
            },
        });
    }
    const jwt = (0, jwt_1.signToken)({ id: user.id, email: user.email }, "7d");
    return {
        success: true,
        token: jwt,
        user,
    };
};
exports.authWithGoogle = authWithGoogle;
const authWithFacebook = async (payload) => {
    var _a, _b;
    const { accessToken } = payload;
    if (!accessToken)
        throw new Error("Facebook access token missing");
    const fbResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`);
    const fbData = await fbResponse.json();
    if (fbData.error) {
        throw new Error(fbData.error.message || "Invalid Facebook token");
    }
    const email = fbData.email;
    const name = fbData.name || "Facebook User";
    const picture = ((_b = (_a = fbData.picture) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url) || null;
    if (!email) {
        throw new Error("Email not found in Facebook account. Please ensure your Facebook email is public.");
    }
    let user = await db_1.default.user.findUnique({ where: { email } });
    if (!user) {
        user = await db_1.default.user.create({
            data: {
                email,
                name,
                picture: picture,
                password: "facebook-auth",
                role: "USER"
            },
        });
    }
    const jwt = (0, jwt_1.signToken)({ id: user.id, email: user.email, role: user.role }, "7d");
    return {
        success: true,
        token: jwt,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
exports.authWithFacebook = authWithFacebook;
exports.AuthService = {
    loginWithEmailAndPassword,
    authWithGoogle: exports.authWithGoogle,
    authWithFacebook: exports.authWithFacebook,
};
//# sourceMappingURL=auth.service.js.map