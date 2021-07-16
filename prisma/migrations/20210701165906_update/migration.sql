/*
  Warnings:

  - Added the required column `reportType` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` ADD COLUMN `reportType` ENUM('USER', 'PRODUCT', 'REVIEW') NOT NULL;
