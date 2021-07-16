/*
  Warnings:

  - You are about to drop the `_ratingtoreview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ratingtoreview` DROP FOREIGN KEY `_ratingtoreview_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ratingtoreview` DROP FOREIGN KEY `_ratingtoreview_ibfk_2`;

-- DropTable
DROP TABLE `_ratingtoreview`;
