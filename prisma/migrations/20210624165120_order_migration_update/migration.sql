-- AlterTable
ALTER TABLE `orders` ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'COMPLETED') NOT NULL DEFAULT 'PENDING';
