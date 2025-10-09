"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("./contact.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const router = express_1.default.Router();
router.post("/", contact_controller_1.handleContactMessage);
router.get("/", auth_1.default, adminMiddleware_1.adminMiddleware, contact_controller_1.getAllContacts);
exports.ContactRoutes = router;
//# sourceMappingURL=contact.route.js.map