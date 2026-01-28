"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterController = void 0;
const newsletter_service_1 = require("./newsletter.service");
const subscribe = async (req, res) => {
    try {
        const result = await newsletter_service_1.NewsletterService.subscribeToNewsletter(req.body);
        res.status(201).json({
            success: true,
            message: "Successfully subscribed to newsletter!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.code === 'P2002' ? "Email already exists!" : error.message,
        });
    }
};
const getSubscribers = async (req, res) => {
    try {
        const result = await newsletter_service_1.NewsletterService.getAllSubscribers();
        res.status(200).json({
            success: true,
            message: "Subscribers retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const removeSubscriber = async (req, res) => {
    try {
        await newsletter_service_1.NewsletterService.deleteSubscriber(req.params.id);
        res.status(200).json({
            success: true,
            message: "Subscriber removed successfully",
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.NewsletterController = {
    subscribe,
    getSubscribers,
    removeSubscriber,
};
//# sourceMappingURL=newsletter.controller.js.map