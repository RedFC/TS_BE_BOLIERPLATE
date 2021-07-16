/*
  Warnings:

  - Added the required column `reviewId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN `reviewId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comments` ADD FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
