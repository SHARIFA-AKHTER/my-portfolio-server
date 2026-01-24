import { Request, Response } from "express";
import { TestimonialService } from "./testimonial.service";

const getTestimonials = async (req: Request, res: Response) => {
  try {
    const result = await TestimonialService.getAllTestimonials();
    res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const addTestimonial = async (req: Request, res: Response) => {
  try {
 
    const { name, role, comment, avatar } = req.body;
    if (!name || !role || !comment || !avatar) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, role, comment, avatar) are required",
      });
    }

    const result = await TestimonialService.createTestimonial(req.body);
    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add testimonial",
    });
  }
};

const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    await TestimonialService.deleteTestimonial(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const TestimonialController = {
  getTestimonials,
  addTestimonial,
  deleteTestimonial
};