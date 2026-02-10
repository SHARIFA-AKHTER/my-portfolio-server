import express from "express";
import { BlogController } from "./blog.controller";
import authMiddleware from "../../middleware/auth";
import { adminMiddleware } from "../../middleware/adminMiddleware";

const router = express.Router();

//public
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById);

//admin
router.post(
  "/",
  // authMiddleware,
  // adminMiddleware,
  BlogController.createBlog,
);
router.put(
  "/:id",
  //  authMiddleware,
  //   adminMiddleware,
  BlogController.updateBlog,
);
router.delete(
  "/:id",
  // authMiddleware,
  // adminMiddleware,
  BlogController.deleteBlog,
);
router.patch("/:id/view", BlogController.increaseView);
export const BlogRoute = router;
