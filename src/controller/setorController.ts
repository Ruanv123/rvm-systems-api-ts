import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export const createSetor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    //regras de negocio
    const RName = name.toLowerCase()

    const setor = await prisma.setor.create({
      data: {
        name: RName
      }
  
    })

    res.status(200).send(setor)
  } catch (error) {
    res.status(400).send('ocorrreu um erro ao criar um setor' + error)
  }
}

export const GetAllSetores = async (req: Request, res: Response) => {
  try {
    const setor = await prisma.setor.findMany()
    res.status(200).send(setor)
  } catch (error) {
    res.status(400).send('ocorrreu um erro ao criar um setor' + error)
  }
}