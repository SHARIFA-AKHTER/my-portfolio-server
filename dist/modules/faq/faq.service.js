"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createFaq = async (data) => {
    var _a;
    return db_1.default.faq.create({
        data: {
            ...data,
            order: (_a = data.order) !== null && _a !== void 0 ? _a : 0
        }
    });
};
const getAllFaqs = async () => {
    return await db_1.default.faq.findMany({
        orderBy: { order: 'asc' }
    });
};
const deleteFaqFromDB = async (id) => {
    return await db_1.default.faq.delete({
        where: { id }
    });
};
exports.FaqService = { createFaq, getAllFaqs, deleteFaqFromDB };
//# sourceMappingURL=faq.service.js.map