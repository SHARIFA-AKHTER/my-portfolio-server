"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const loginWithEmailAndPassword = async (req, res) => {
    try {
        const result = await auth_service_1.AuthService.loginWithEmailAndPassword(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const authWithGoogle = async (req, res) => {
    try {
        const result = await auth_service_1.AuthService.authWithGoogle(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.AuthController = {
    loginWithEmailAndPassword,
    authWithGoogle,
};
//# sourceMappingURL=auth.controller.js.map