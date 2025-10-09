"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
// Email + Password login
router.post("/login", auth_controller_1.AuthController.loginWithEmailAndPassword);
// Google login
router.post("/google-login", auth_controller_1.AuthController.authWithGoogle);
exports.AuthRoute = router;
//# sourceMappingURL=auth.route.js.map