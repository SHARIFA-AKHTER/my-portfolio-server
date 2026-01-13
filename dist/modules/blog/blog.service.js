"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createBlog = async (payload) => {
    var _a;
    return await db_1.default.blog.create({
        data: {
            title: payload.title,
            slug: payload.slug,
            content: payload.content,
            authorId: payload.authorId,
            excerpt: payload.excerpt,
            coverUrl: payload.coverUrl,
            published: (_a = payload.published) !== null && _a !== void 0 ? _a : false,
        },
    });
};
const getAllBlogs = async () => {
    return await db_1.default.blog.findMany({
        include: { author: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: "desc" },
    });
};
const getBlogById = async (id) => {
    return await db_1.default.blog.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    picture: true,
                    isVerified: true,
                },
            },
        },
    });
};
const updateBlog = async (id, payload) => {
    const existingBlog = await db_1.default.blog.findUnique({ where: { id } });
    if (!existingBlog) {
        throw new Error("Blog not found");
    }
    return await db_1.default.blog.update({
        where: { id },
        data: payload,
    });
};
const deleteBlog = async (id) => {
    return await db_1.default.blog.delete({
        where: { id },
    });
};
const increaseView = async (id) => {
    const blog = await db_1.default.blog.findUnique({ where: { id } });
    if (!blog)
        throw new Error("Blog not found");
    const updatedBlog = await db_1.default.blog.update({
        where: { id },
        data: {
            views: { increment: 1 },
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    picture: true,
                    isVerified: true,
                },
            },
        },
    });
    return updatedBlog;
};
exports.BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    increaseView,
};
//# sourceMappingURL=blog.service.js.map