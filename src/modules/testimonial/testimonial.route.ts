import express from "express";
import { TestimonialController } from "./testimonial.controller";

const router = express.Router();

router.get("/", TestimonialController.getTestimonials);


router.post("/add", TestimonialController.addTestimonial);
router.delete("/:id", TestimonialController.deleteTestimonial);

export const testimonialRoutes = router;
