import prisma from "../../config/db";
import { INewsletter } from "./newsletter.interface";

const subscribeToNewsletter = async (data: INewsletter) => {

  return await prisma.newsletter.create({
    data,
  });
};

const getAllSubscribers = async () => {
  return await prisma.newsletter.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const deleteSubscriber = async (id: string) => {
  return await prisma.newsletter.delete({
    where: { id },
  });
};

export const NewsletterService = {
  subscribeToNewsletter,
  getAllSubscribers,
  deleteSubscriber,
};