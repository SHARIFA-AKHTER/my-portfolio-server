import prisma from "../../config/db";

const getStatsFromDB = async () => {

  const [projects, blogs, users, messages, faqs, subscribers] = await Promise.all([
    prisma.project.count(),      
    prisma.blog.count(),         
    prisma.user.count(),         
    prisma.contact.count(),     
    prisma.faq.count(),          
    prisma.newsletter.count(),   
  ]);

  return {
    projects,
    blogs,
    users,
    messages,
    faqs,
    subscribers,
  };
};

export const AnalyticsService = {
  getStatsFromDB,
};