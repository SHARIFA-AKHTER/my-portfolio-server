"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const testimonial_controller_1 = require("./testimonial.controller");
const router = express_1.default.Router();
router.get("/", testimonial_controller_1.TestimonialController.getTestimonials);
router.post("/add", testimonial_controller_1.TestimonialController.addTestimonial);
router.delete("/:id", testimonial_controller_1.TestimonialController.deleteTestimonial);
exports.testimonialRoutes = router;
//# sourceMappingURL=testimonial.route.js.map