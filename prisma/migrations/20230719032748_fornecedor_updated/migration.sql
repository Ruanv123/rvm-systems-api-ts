/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `fornecedor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fornecedor_nome_key` ON `fornecedor`(`nome`);
