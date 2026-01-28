"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const subscribeToNewsletter = async (data) => {
    return await db_1.default.newsletter.create({
        data,
    });
};
const getAllSubscribers = async () => {
    return await db_1.default.newsletter.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
const deleteSubscriber = async (id) => {
    return await db_1.default.newsletter.delete({
        where: { id },
    });
};
exports.NewsletterService = {
    subscribeToNewsletter,
    getAllSubscribers,
    deleteSubscriber,
};
//# sourceMappingURL=newsletter.service.js.map