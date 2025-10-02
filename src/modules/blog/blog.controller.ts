import { Request, Response } from "express";
import { BlogService } from "./blog.service";

const createBlog = async (req: Request, res: Response) => {
  try {
    const result = await BlogService.createBlog(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
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

const getBlogById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await BlogService.getBlogById(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await BlogService.updateBlog(id, req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
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

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
