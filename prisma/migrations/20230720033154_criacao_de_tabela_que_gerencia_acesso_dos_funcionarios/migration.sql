/*
  Warnings:

  - You are about to drop the column `accessId` on the `funcionario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `funcionario` DROP FOREIGN KEY `funcionario_accessId_fkey`;

-- AlterTable
ALTER TABLE `funcionario` DROP COLUMN `accessId`;

-- CreateTable
CREATE TABLE `funcionario_acess` (
    `id` VARCHAR(191) NOT NULL,
    `funcionarioId` VARCHAR(191) NULL,
    `accessId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `funcionario_acess` ADD CONSTRAINT `funcionario_acess_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `funcionario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionario_acess` ADD CONSTRAINT `funcionario_acess_accessId_fkey` FOREIGN KEY (`accessId`) REFERENCES `acesso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
