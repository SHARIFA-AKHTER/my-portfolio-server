"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getStatsFromDB = async () => {
    const [projects, blogs, users, messages, faqs, subscribers] = await Promise.all([
        db_1.default.project.count(),
        db_1.default.blog.count(),
        db_1.default.user.count(),
        db_1.default.contact.count(),
        db_1.default.faq.count(),
        db_1.default.newsletter.count(),
    ]);
    return {
        projects,
        blogs,
        users,
        messages,
        faqs,
        subscribers,
    };
};
exports.AnalyticsService = {
    getStatsFromDB,
};
//# sourceMappingURL=analytics.service.js.map