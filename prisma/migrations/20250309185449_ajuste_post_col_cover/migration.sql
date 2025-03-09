/*
  Warnings:

  - You are about to drop the column `conver` on the `Post` table. All the data in the column will be lost.
  - Added the required column `cover` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "conver",
ADD COLUMN     "cover" TEXT NOT NULL;
