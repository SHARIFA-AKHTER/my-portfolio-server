import express from "express";
import { ProjectController } from "./project.controller";

const router = express.Router();

router.post("/", ProjectController.createProject); // Create
router.get("/", ProjectController.getAllProjects); // Get all
router.get("/:id", ProjectController.getProjectById); // Get one
router.put("/:id", ProjectController.updateProject); // Update
router.delete("/:id", ProjectController.deleteProject); // Delete

export const ProjectRoute = router;
