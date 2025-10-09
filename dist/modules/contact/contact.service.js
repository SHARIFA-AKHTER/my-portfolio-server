"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContactsService = exports.createContact = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createContact = async (payload) => {
    const contact = await db_1.default.contact.create({
        data: {
            name: payload.name,
            email: payload.email,
            subject: payload.subject,
            message: payload.message,
        },
    });
    return contact;
};
exports.createContact = createContact;
const getAllContactsService = async () => {
    return await db_1.default.contact.findMany({
        orderBy: { createdAt: "desc" },
    });
};
exports.getAllContactsService = getAllContactsService;
//# sourceMappingURL=contact.service.js.map