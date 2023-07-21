import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export const createProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco, quantidade, tipo, codbarras, fornecedorName, nomeLoja } = req.body

    const isFornecedor = await prisma.fornecedor.findUnique({
      where: {
        nome: fornecedorName
      }
    })

    if (!isFornecedor) {
      res.status(400).json('o fornecedor que voce esta tentando atribuir ao produto nao existe!')
    }

    const produto = await prisma.produto.create({
      data: {
        nome: nome,
        descricao: descricao,
        preco: preco,
        quantidade: quantidade,
        tipo: tipo,
        codbarras: codbarras,
        Fornecedor: {
          connect: {
            nome: fornecedorName
          }
        },
        Loja: {
          connect: {
            name: nomeLoja
          }
        }
      },
      select: {
        nome: true,
        descricao: true,
        preco: true,
        imagem: true,
        quantidade: true,
        tipo: true,
        codbarras: true,
        createdAt: true,
        updatedAt: true,
        Fornecedor: {
          select: {
            nome: true,
          }
        },
        Loja: {
          select: {
            name: true
          }
        }
      }
    })

    res.status(200).send(produto)
  } catch (error) {
    res.status(400).send("ocorreu um error ao criar produto" + error)
  }
}

export const GetAllProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany({
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        imagem: true,
        quantidade: true,
        tipo: true,
        codbarras: true,
        createdAt: true,
        updatedAt: true,
        Fornecedor: {
          select: {
            nome: true,
          }
        },
      }
    })

    res.status(200).send(produtos)
  } catch (error) {
    res.status(400).send("ocorreu um error ao selecionar produtos" + error)
  }
}

export const deleteProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.produto.delete({
      where: {
        id
      }
    })

    res.status(200).send()
  } catch (error) {
    res.status(400).send(error)
  }
}