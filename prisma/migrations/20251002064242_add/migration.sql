-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "backendRepo" TEXT,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "frontendRepo" TEXT;
