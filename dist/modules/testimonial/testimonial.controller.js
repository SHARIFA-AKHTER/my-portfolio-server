"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialController = void 0;
const testimonial_service_1 = require("./testimonial.service");
const getTestimonials = async (req, res) => {
    try {
        const result = await testimonial_service_1.TestimonialService.getAllTestimonials();
        res.status(200).json({
            success: true,
            message: "Testimonials fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
const addTestimonial = async (req, res) => {
    try {
        const { name, role, comment, avatar } = req.body;
        if (!name || !role || !comment || !avatar) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, role, comment, avatar) are required",
            });
        }
        const result = await testimonial_service_1.TestimonialService.createTestimonial(req.body);
        res.status(201).json({
            success: true,
            message: "Testimonial added successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to add testimonial",
        });
    }
};
const deleteTestimonial = async (req, res) => {
    try {
        await testimonial_service_1.TestimonialService.deleteTestimonial(req.params.id);
        res.status(200).json({ success: true, message: "Deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.TestimonialController = {
    getTestimonials,
    addTestimonial,
    deleteTestimonial
};
//# sourceMappingURL=testimonial.controller.js.map