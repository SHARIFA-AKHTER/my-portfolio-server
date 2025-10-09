"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const db_1 = __importDefault(require("../../config/db"));
// const createProject = async (payload: ProjectPayload) => {
//   return await prisma.project.create({
//     data: payload,
//   });
// };
const createProject = async (payload) => {
    var _a, _b;
    return await db_1.default.project.create({
        data: {
            title: payload.title,
            slug: payload.slug,
            description: payload.description,
            liveUrl: payload.liveUrl,
            frontendRepo: payload.frontendRepo,
            backendRepo: payload.backendRepo,
            techStack: (_a = payload.techStack) !== null && _a !== void 0 ? _a : [],
            image: (_b = payload.image) !== null && _b !== void 0 ? _b : [],
            authorId: payload.authorId,
        },
    });
};
const getAllProjects = async () => {
    return await db_1.default.project.findMany({
        include: { author: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: "desc" },
    });
};
const getProjectById = async (id) => {
    return await db_1.default.project.findUnique({
        where: { id },
        include: { author: { select: { id: true, name: true, email: true } } },
    });
};
const updateProject = async (id, payload) => {
    var _a, _b;
    return await db_1.default.project.update({
        where: { id },
        data: {
            title: payload.title,
            slug: payload.slug,
            description: payload.description,
            liveUrl: payload.liveUrl,
            frontendRepo: payload.frontendRepo,
            backendRepo: payload.backendRepo,
            techStack: (_a = payload.techStack) !== null && _a !== void 0 ? _a : [],
            features: payload.features,
            image: (_b = payload.image) !== null && _b !== void 0 ? _b : [],
            author: payload.authorId
                ? { connect: { id: payload.authorId } }
                : undefined,
        },
    });
};
const deleteProject = async (id) => {
    return await db_1.default.project.delete({
        where: { id },
    });
};
exports.ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
// import prisma from "../../config/db";
// interface ProjectPayload {
//   techStack: string[];
//   image?: string[];
//   content?: any;
//   slug: string;
//   published?: boolean;
//   excerpt?: any;
//   coverUrl?: string;
//   title: string;
//   description: string;
//   thumbnail?: string;
//   liveUrl?: string;
//   frontendRepo?: string;
//   backendRepo?: string;
//   features?: string[];
//   authorId: number;
// }
// // Create Project
// const createProject = async (payload: ProjectPayload) => {
//   if (!payload.title || !payload.slug || !payload.authorId) {
//     throw new Error("title, slug, authorId are required!");
//   }
//   return await prisma.project.create({
//     data: {
//       title: payload.title,
//       slug: payload.slug,
//       description: payload.description,
//       liveUrl: payload.liveUrl ?? null,
//       frontendRepo: payload.frontendRepo ?? null,
//       backendRepo: payload.backendRepo ?? null,
//       techStack: payload.techStack ?? [],
//       features: payload.features ?? [],
//       image: payload.image ?? [],
//       authorId: payload.authorId,
//     },
//   });
// };
// // Get All Projects
// const getAllProjects = async () => {
//   return await prisma.project.findMany({
//     include: {
//       author: {
//         select: { id: true, name: true, email: true },
//       },
//     },
//     orderBy: { createdAt: "desc" },
//   });
// };
// // Get Project by ID
// const getProjectById = async (id: number) => {
//   return await prisma.project.findUnique({
//     where: { id },
//     include: {
//       author: {
//         select: { id: true, name: true, email: true },
//       },
//     },
//   });
// };
// // Update Project
// const updateProject = async (id: number, payload: Partial<ProjectPayload>) => {
//   return await prisma.project.update({
//     where: { id },
//     data: {
//       title: payload.title,
//       slug: payload.slug,
//       description: payload.description,
//       liveUrl: payload.liveUrl,
//       frontendRepo: payload.frontendRepo,
//       backendRepo: payload.backendRepo,
//       techStack: payload.techStack ?? undefined,
//       features: payload.features ?? undefined,
//       image: payload.image ?? [],
//       author: payload.authorId
//         ? { connect: { id: payload.authorId } }
//         : undefined,
//     },
//   });
// };
// // Delete Project
// const deleteProject = async (id: number) => {
//   return await prisma.project.delete({
//     where: { id },
//   });
// };
// export const ProjectService = {
//   createProject,
//   getAllProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
// };
//# sourceMappingURL=project.service.js.map