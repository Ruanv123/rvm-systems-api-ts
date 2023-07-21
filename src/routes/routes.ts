import { Router } from "express";
import { GetAllFuncionarios, createFuncionario, deleteUser } from "../controller/userController";
import { GetAllAccess, createAccess } from "../controller/accessController";
import { GetAllSetores, createSetor } from "../controller/setorController";
import { GetAllProdutos, createProduto, deleteProduto } from "../controller/produtoController";
import { GetAllFornecedores, createFornecedor } from "../controller/fornecedorController";
import { GetStores, createLoja } from "../controller/lojaController";

export const router  = Router()

//funcionario
router.post("/funcionario", createFuncionario)
router.get("/funcionarios", GetAllFuncionarios)
router.delete("/funcionario/:email", deleteUser)

// permissao
router.post("/access", createAccess)
router.get("/access", GetAllAccess)

//setor
router.post("/setor", createSetor)
router.get("/setores", GetAllSetores)

//produto
router.post("/produto", createProduto)
router.get("/produtos", GetAllProdutos)
router.delete("/produto/:id", deleteProduto)

//fornecedor 
router.post("/fornecedor", createFornecedor)
router.get("/fornecedores", GetAllFornecedores)

//lojas 
router.post("/loja/:id", createLoja)
router.get("/lojas", GetStores)