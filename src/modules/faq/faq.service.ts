import prisma from "../../config/db";
import { IFaq } from "./faq.interface";


const createFaq = async (data: IFaq) => {
  return prisma.faq.create({
    data: {
      ...data,
      order: data.order ?? 0
    }
  });
};

const getAllFaqs = async () => {
  return await prisma.faq.findMany({
    orderBy: { order: 'asc' }
  });
};

const deleteFaqFromDB = async (id: string) => {
  return await prisma.faq.delete({
    where: { id }
  });
};

export const FaqService = { createFaq, getAllFaqs,deleteFaqFromDB };