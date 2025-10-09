"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoute = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const router = express_1.default.Router();
router.post("/", project_controller_1.ProjectController.createProject); // Create
router.get("/", project_controller_1.ProjectController.getAllProjects); // Get all
router.get("/:id", project_controller_1.ProjectController.getProjectById); // Get one
router.put("/:id", project_controller_1.ProjectController.updateProject); // Update
router.delete("/:id", project_controller_1.ProjectController.deleteProject); // Delete
exports.ProjectRoute = router;
//# sourceMappingURL=project.route.js.map