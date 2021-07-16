/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ReturnPolicy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ReturnPolicy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `returnpolicy` DROP FOREIGN KEY `returnpolicy_ibfk_1`;

-- AlterTable
ALTER TABLE `returnpolicy` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ReturnPolicy_userId_unique` ON `ReturnPolicy`(`userId`);

-- AddForeignKey
ALTER TABLE `ReturnPolicy` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
