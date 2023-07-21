import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../services/prisma";

interface DecodedToken {
  userId: string
}

export function authMiddleware(permissoes?: string[]) {
  return  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: 'Token nao fornecido' })
    }

    const token = authHeader?.substring(7)

    try {
      const MY_SECRET_KEY = process.env.MY_SECRET_KEY

      if (!MY_SECRET_KEY) {
        throw new Error("Chave secreta nao fornecida!")
      }
      const decodedToken = verify(token, MY_SECRET_KEY) as DecodedToken

      req.user = { id: decodedToken.userId }

      if(permissoes) {
        const funcionario = await prisma.funcionario.findUnique({
          where:{
            id: decodedToken.userId
          },
          include: {
            funcionarioAcces:{
              select: {
                Access:{
                  select:{
                    name: true
                  }
                }
              }
            }
          }
        })
      }
    } catch (error) {

    }
  }
}