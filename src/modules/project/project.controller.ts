import { Request, Response } from "express";
import { ProjectService } from "./project.service";

const createProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.createProject(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.getAllProjects();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await ProjectService.getProjectById(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await ProjectService.updateProject(id, req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await ProjectService.deleteProject(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
