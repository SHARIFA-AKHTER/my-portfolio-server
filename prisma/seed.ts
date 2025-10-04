
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "sr0589071@gmail.com" },
    update: {},
    create: {
      name: "Admin",
      email: "sr0589071@gmail.com",
      password: hashedPassword,
      phone: "01315904044",
      role: "ADMIN",
      isVerified: true,
      status: "ACTIVE",
    },
  });

  console.log("Admin user created:", admin);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
