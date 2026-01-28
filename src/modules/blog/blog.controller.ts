import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import prisma from "../../config/db";

const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, excerpt, coverUrl, authorId } = req.body;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverUrl,
        authorId,
      },
    });

    res.json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const result = await BlogService.getAllBlogs();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// const getBlogById = async (req: Request, res: Response) => {
//   try {
//     const id = parseInt(req.params.id);
//     const result = await BlogService.getBlogById(id);
//     res.status(200).json(result);
//   } catch (error: any) {
//     res.status(404).json({ success: false, message: error.message });
//   }
// };

const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blogId = parseInt(id);
    if (isNaN(blogId)) {
      return res.status(400).json({ success: false, message: "ID must be a number" });
    }

    const result = await BlogService.getBlogById(blogId);
   
    if (!result) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const blog = await BlogService.updateBlog(id, req.body);

    res.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Blog not found",
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await BlogService.deleteBlog(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const increaseView = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const blog = await BlogService.increaseView(id);

    res.status(200).json({
      success: true,
      message: "View count increased successfully",
      data: blog,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  increaseView,
};
