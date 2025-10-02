import express from "express";
import { BlogController } from "./blog.controller";

const router = express.Router();

router.post("/", BlogController.createBlog); // Create
router.get("/", BlogController.getAllBlogs); // Get all
router.get("/:id", BlogController.getBlogById); // Get one
router.put("/:id", BlogController.updateBlog); // Update
router.delete("/:id", BlogController.deleteBlog); // Delete

export const BlogRoute = router;
