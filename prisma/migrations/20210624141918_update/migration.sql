/*
  Warnings:

  - You are about to drop the column `reviewId` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_2`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `reviewId`;
