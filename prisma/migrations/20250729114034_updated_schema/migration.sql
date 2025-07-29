-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "github_link" TEXT,
ADD COLUMN     "live_link" TEXT;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "category" TEXT[];
