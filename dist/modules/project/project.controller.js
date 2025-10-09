"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_service_1 = require("./project.service");
const createProject = async (req, res) => {
    try {
        const result = await project_service_1.ProjectService.createProject(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const getAllProjects = async (req, res) => {
    try {
        const result = await project_service_1.ProjectService.getAllProjects();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getProjectById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await project_service_1.ProjectService.getProjectById(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
const updateProject = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await project_service_1.ProjectService.updateProject(id, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const deleteProject = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await project_service_1.ProjectService.deleteProject(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
//# sourceMappingURL=project.controller.js.map