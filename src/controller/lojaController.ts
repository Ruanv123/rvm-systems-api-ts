import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export const createLoja = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const { id } = req.params

    const isFuncionario = await prisma.funcionario.findUnique({
      where: {
        id,
      }
    })

    if (!isFuncionario) {
      res.status(400).send('Usuario nao existe!')
    }
    const loja = await prisma.loja.create({
      data: {
        name: name,
        Funcionario: {
          connect: {
            id
          }
        }
      },
      select: {
        id: true,
        name: true,
        Funcionario: {
          select: {
            name: true
          }
        },
        createdAt: true,
        updatedAt: true,
      }
    })
    res.status(200).send(loja)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const GetStores = async (req: Request, res: Response) => {
  try {
    const lojas = await prisma.loja.findMany({
      select: {
        id: true,
        name: true,
        Funcionario: {
          select: {
            name: true
          }
        },
        produtos: {
          select: {
            nome: true,
            descricao: true,
            preco: true,
            imagem: true,
            quantidade: true,
            tipo: true,
            codbarras: true,
            Fornecedor: {
              select: {
                nome: true
              }
            }
          }
        }
      }
    })

    res.status(200).send(lojas)

  } catch (error) {
    res.status(400).send(error)
  }
}