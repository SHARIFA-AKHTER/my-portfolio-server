import prisma from "../../config/db";

interface ProjectPayload {
  techStack: any;
  content: any;
  slug: any;
  published: boolean;
  excerpt: any;
  coverUrl: any;
  title: string;
  description: string;
  thumbnail?: string;
  liveUrl?: string;
  frontendRepo?: string;
  backendRepo?: string;
  features?: string[];
  authorId: number;
}

// const createProject = async (payload: ProjectPayload) => {
//   return await prisma.project.create({
//     data: payload,
//   });
// };

const createProject = async (payload: ProjectPayload) => {
  return await prisma.project.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      description: payload.description,
      liveUrl: payload.liveUrl,
      frontendRepo: payload.frontendRepo,
      backendRepo: payload.backendRepo,
      techStack: payload.techStack?.join(", "),
      authorId: payload.authorId,
    },
  });
};

const getAllProjects = async () => {
  return await prisma.project.findMany({
    include: { author: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const getProjectById = async (id: number) => {
  return await prisma.project.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, email: true } } },
  });
};

const updateProject = async (id: number, payload: Partial<ProjectPayload>) => {
  return await prisma.project.update({
    where: { id },
    data: payload,
  });
};

const deleteProject = async (id: number) => {
  return await prisma.project.delete({
    where: { id },
  });
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
