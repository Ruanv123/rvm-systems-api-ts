import e, { Request, Response } from "express";
import { prisma } from "../services/prisma";

export const createFornecedor = async (req: Request, res: Response) => {
  try {
    const { nome, telefone, email, cnpj, endereco, cep, tipo } = req.body

    const Rnome = nome.toLowerCase()

    const fornecedor = await prisma.fornecedor.create({
      data: {
        nome: Rnome,
        telefone: telefone,
        email: email,
        cnpj: cnpj,
        cep: cep,
        endereco: endereco,
        tipo: tipo
      }
    })

    res.status(200).send(fornecedor)
  } catch (error) {
    res.status(400).send("ocorreu um error ao criar fornecedor" + error)
  }
}

export const GetAllFornecedores = async (req: Request, res: Response) => {
  try {
    const fornecedor = await prisma.fornecedor.findMany()
    res.status(200).send(fornecedor)
  } catch (error) {
    res.status(400).send("ocorreu um erro" + error)
  }
}