/*
  Warnings:

  - You are about to drop the column `produtoId` on the `fornecedor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `fornecedor` DROP FOREIGN KEY `fornecedor_produtoId_fkey`;

-- AlterTable
ALTER TABLE `fornecedor` DROP COLUMN `produtoId`;

-- AlterTable
ALTER TABLE `produto` ADD COLUMN `fornecedorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `fornecedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
