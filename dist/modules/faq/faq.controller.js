"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqController = void 0;
const faq_service_1 = require("./faq.service");
const getFaqs = async (req, res) => {
    try {
        const result = await faq_service_1.FaqService.getAllFaqs();
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const addFaq = async (req, res) => {
    try {
        const result = await faq_service_1.FaqService.createFaq(req.body);
        res.status(201).json({ success: true, data: result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        await faq_service_1.FaqService.deleteFaqFromDB(id);
        res.status(200).json({
            success: true,
            message: "FAQ deleted successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete FAQ"
        });
    }
};
exports.FaqController = { getFaqs, addFaq, deleteFaq };
//# sourceMappingURL=faq.controller.js.map