"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blog_service_1 = require("./blog.service");
const db_1 = __importDefault(require("../../config/db"));
const createBlog = async (req, res) => {
    try {
        const { title, slug, content, excerpt, coverUrl, authorId } = req.body;
        const blog = await db_1.default.blog.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                coverUrl,
                authorId,
            },
        });
        res.json({
            success: true,
            message: "Blog created successfully",
            blog,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const getAllBlogs = async (req, res) => {
    try {
        const result = await blog_service_1.BlogService.getAllBlogs();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getBlogById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await blog_service_1.BlogService.getBlogById(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
const updateBlog = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const blog = await blog_service_1.BlogService.updateBlog(id, req.body);
        res.json({
            success: true,
            message: "Blog updated successfully",
            blog,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "Blog not found",
        });
    }
};
const deleteBlog = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await blog_service_1.BlogService.deleteBlog(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.BlogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
//# sourceMappingURL=blog.controller.js.map