/*
  Warnings:

  - You are about to drop the column `userId` on the `returnpolicy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `returnpolicy` DROP FOREIGN KEY `returnpolicy_ibfk_1`;

-- AlterTable
ALTER TABLE `returnpolicy` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `ReturnPolicy` ADD FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
