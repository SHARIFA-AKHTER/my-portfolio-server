import prisma from "../../config/db";
import { ITestimonial } from "./testimonial.interface";

const createTestimonial = async (data: ITestimonial) => {
  return await prisma.testimonial.create({ 
    data: {
      name: data.name,
      role: data.role,
      comment: data.comment,
      avatar: data.avatar,
    },
  });
};

const getAllTestimonials = async () => {
  return await prisma.testimonial.findMany({ 
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const TestimonialService = {
  createTestimonial,
  getAllTestimonials
};