import prisma from "../../config/db";

interface BlogPayload {
  title: string;
  slug: string;
  content: string;
  authorId: number;
  excerpt?: string;
  coverUrl?: string;
  published?: boolean;
}

const createBlog = async (payload: BlogPayload) => {
  return await prisma.blog.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      authorId: payload.authorId,
      excerpt: payload.excerpt,
      coverUrl: payload.coverUrl,
      published: payload.published ?? false,
    },
  });
};
const getAllBlogs = async () => {
  return await prisma.blog.findMany({
    include: { author: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const getBlogById = async (id: number) => {
  return await prisma.blog.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, email: true } } },
  });
};

const updateBlog = async (id: number, payload: Partial<BlogPayload>) => {
  const existingBlog = await prisma.blog.findUnique({ where: { id } });
  if (!existingBlog) {
    throw new Error("Blog not found");
  }

  return await prisma.blog.update({
    where: { id },
    data: payload,
  });
};
const deleteBlog = async (id: number) => {
  return await prisma.blog.delete({
    where: { id },
  });
};
export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
