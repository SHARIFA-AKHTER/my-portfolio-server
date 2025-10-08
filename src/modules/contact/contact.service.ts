import prisma from "../../config/db";

export const createContact = async (payload: any) => {
  const contact = await prisma.contact.create({
    data: {
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
    },
  });
  return contact;
};
