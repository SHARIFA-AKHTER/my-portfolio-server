"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "ADMIN") {
            return res.status(403).json({ message: "Forbidden - Admins only" });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Admin token check failed:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=adminMiddleware.js.map