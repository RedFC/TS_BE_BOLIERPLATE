/*
  Warnings:

  - Made the column `ratingId` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_ibfk_3`;

-- AlterTable
ALTER TABLE `review` MODIFY `ratingId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_RatingToReview` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RatingToReview_AB_unique`(`A`, `B`),
    INDEX `_RatingToReview_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD FOREIGN KEY (`ratingId`) REFERENCES `Rating`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RatingToReview` ADD FOREIGN KEY (`A`) REFERENCES `Rating`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RatingToReview` ADD FOREIGN KEY (`B`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
