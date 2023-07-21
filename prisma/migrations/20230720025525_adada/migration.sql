/*
  Warnings:

  - Added the required column `cpf` to the `cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `descricao` VARCHAR(191) NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `loja` ADD COLUMN `funcionarioId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `situacao` (
    `id` VARCHAR(191) NOT NULL,
    `situacao` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atividade` (
    `id` VARCHAR(191) NOT NULL,
    `atividade` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contas_a_pagar` (
    `id` VARCHAR(191) NOT NULL,
    `fornecedorId` VARCHAR(191) NULL,
    `atividadeId` VARCHAR(191) NULL,
    `numeroDoc` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meio_pagamento` (
    `id` VARCHAR(191) NOT NULL,
    `meio` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contas_a_receber` (
    `id` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `meioPagamentoId` VARCHAR(191) NULL,
    `situacao` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `loja` ADD CONSTRAINT `loja_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `funcionario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contas_a_pagar` ADD CONSTRAINT `contas_a_pagar_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `fornecedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contas_a_pagar` ADD CONSTRAINT `contas_a_pagar_atividadeId_fkey` FOREIGN KEY (`atividadeId`) REFERENCES `atividade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contas_a_receber` ADD CONSTRAINT `contas_a_receber_meioPagamentoId_fkey` FOREIGN KEY (`meioPagamentoId`) REFERENCES `meio_pagamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
