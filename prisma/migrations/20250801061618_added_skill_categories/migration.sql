/*
  Warnings:

  - You are about to drop the column `category` on the `Skill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "SkillCategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SkillCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SkillToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SkillToCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkillCategories_name_key" ON "SkillCategories"("name");

-- CreateIndex
CREATE INDEX "_SkillToCategory_B_index" ON "_SkillToCategory"("B");

-- AddForeignKey
ALTER TABLE "_SkillToCategory" ADD CONSTRAINT "_SkillToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToCategory" ADD CONSTRAINT "_SkillToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SkillCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
