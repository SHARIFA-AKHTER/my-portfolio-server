"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContacts = exports.handleContactMessage = void 0;
const contact_service_1 = require("./contact.service");
const handleContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }
        const contact = await (0, contact_service_1.createContact)({ name, email, subject, message });
        res.status(201).json({
            success: true,
            message: "Message received successfully ✅",
            contact,
        });
    }
    catch (error) {
        console.error("❌ Contact error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error ❌",
        });
    }
};
exports.handleContactMessage = handleContactMessage;
const getAllContacts = async (req, res) => {
    try {
        const contacts = await (0, contact_service_1.getAllContactsService)();
        res.status(200).json({
            success: true,
            data: contacts,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.getAllContacts = getAllContacts;
//# sourceMappingURL=contact.controller.js.map