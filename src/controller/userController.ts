import { Request, Response } from "express";
import { prisma } from "../services/prisma";
import { hashSync } from "bcrypt";

export const createFuncionario = async (req: Request, res: Response) => {
  const { name, email, password, telefone, setor, accessName, } = req.body

  const isExistEmail = await prisma.funcionario.findUnique({
    where: {
      email
    }
  })

  if (isExistEmail) {
    return res.status(400).json({ message: "o email já existe!" })
  }

  /*  const isAccessName = await prisma.access.findMany({
     where: {
       id: accessName
     }
   })
 
   if (!isAccessName) {
     return res.status(400).json({ message: "O cargo nao existe!" })
   } */

  const isSetorName = await prisma.setor.findUnique({
    where: {
      name: setor
    }
  })

  if (!isSetorName) {
    return res.status(400).json({ message: "O setor nao existe!" })
  }

  const passwordHashed = await hashSync(password, 10)

  const funcionario = await prisma.funcionario.create({
    data: {
      name,
      email,
      password: passwordHashed,
      telefone,
      //para ter uma permissao apenas
      funcionarioAcces: {
        create: {
          Access: {
            connect: {
              name: accessName,
            },
          },
        },
      },
      //para ter mais de uma permissao
      /* funcionarioAcces: {
        createMany: {
          data: {
            accessId: accessName
          }
        }
      }, */
      Setor: {
        connect: {
          name: setor
        }
      }
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      telefone: true,
      avatar: true,
      desc: true,
      resetCode: true,
      funcionarioAcces: {
        select: {
          Access: {
            select: {
              name: true
            }
          }
        }
      },
      Setor: {
        select: {
          name: true
        }
      },
      createdAt: true,
      updatedAt: true,
    }
  })

  return res.status(200).send(funcionario)
}

export const GetAllFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionario = await prisma.funcionario.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        telefone: true,
        avatar: true,
        desc: true,
        resetCode: true,
        funcionarioAcces: {
          select: {
            Access: {
              select: {
                name: true
              }
            }
          }
        },
        Setor: {
          select: {
            name: true
          }
        },
        createdAt: true,
        updatedAt: true,
      }
    })
    res.status(200).send(funcionario)
  } catch (error) {
    res.status(400).send(`ocorreu um error!` + error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params

    await prisma.funcionario.delete({
      where: {
        email
      }
    })

    res.status(200).send({ messsage: "usuario deletado com sucesso!" })
  } catch (error) {
    res.status(400).send(error)
  }
}