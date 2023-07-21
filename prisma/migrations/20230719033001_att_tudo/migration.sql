/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `fornecedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `loja` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cliente_email_key` ON `cliente`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `fornecedor_email_key` ON `fornecedor`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `loja_name_key` ON `loja`(`name`);
