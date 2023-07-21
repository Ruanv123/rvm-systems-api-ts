import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export const createSituacao = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    //regras de neogico
    const Rname = name.toLowerCase()

    const access = await prisma.access.create({
      data: {
        name: Rname
      }

    })

    res.status(200).send(access)
  } catch (error) {
    res.status(400).send('ocorrreu um erro ao criar um setor' + error)
  }
}

export const GetAllAccess = async (req: Request, res: Response) => {
  try {
    const access = await prisma.access.findMany()
    res.status(200).send(access)
  } catch (error) {
    res.status(400).send('ocorrreu um erro ao criar um setor' + error)
  }
}