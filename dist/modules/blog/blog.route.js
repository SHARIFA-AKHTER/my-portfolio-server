"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const router = express_1.default.Router();
//public
router.get("/", blog_controller_1.BlogController.getAllBlogs);
router.get("/:id", blog_controller_1.BlogController.getBlogById);
//admin
router.post("/", auth_1.default, adminMiddleware_1.adminMiddleware, blog_controller_1.BlogController.createBlog);
router.put("/:id", auth_1.default, adminMiddleware_1.adminMiddleware, blog_controller_1.BlogController.updateBlog);
router.delete("/:id", auth_1.default, adminMiddleware_1.adminMiddleware, blog_controller_1.BlogController.deleteBlog);
router.patch("/:id/view", blog_controller_1.BlogController.increaseView);
exports.BlogRoute = router;
//# sourceMappingURL=blog.route.js.map