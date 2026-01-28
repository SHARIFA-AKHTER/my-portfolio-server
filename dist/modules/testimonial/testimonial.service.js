"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createTestimonial = async (data) => {
    return await db_1.default.testimonial.create({
        data: {
            name: data.name,
            role: data.role,
            comment: data.comment,
            avatar: data.avatar,
        },
    });
};
const getAllTestimonials = async () => {
    return await db_1.default.testimonial.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
const deleteTestimonial = async (id) => {
    return await db_1.default.testimonial.delete({
        where: { id },
    });
};
exports.TestimonialService = {
    createTestimonial,
    getAllTestimonials,
    deleteTestimonial
};
//# sourceMappingURL=testimonial.service.js.map