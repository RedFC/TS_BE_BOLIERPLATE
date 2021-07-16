/*
  Warnings:

  - You are about to drop the `_commentstoreview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_commentstoreview` DROP FOREIGN KEY `_commentstoreview_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_commentstoreview` DROP FOREIGN KEY `_commentstoreview_ibfk_2`;

-- DropTable
DROP TABLE `_commentstoreview`;
