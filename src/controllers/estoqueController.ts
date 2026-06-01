import {Request, Response} from "express"
import { EstoqueService } from "../services/estoqueService"

const estoqueService = new EstoqueService()

export function insereEstoque(req: Request, res: Response){
    try {
        const newEstoque = estoqueService.insereEstoque(req.body)
        res.status(201).json(
        {
            message: "Estoque cadastrado com sucesso!!!",
            estoque: newEstoque
        }
        )
    } catch( error: any){
        res.status(400).json({message: error.message})
    }
}

export function listaEstoque(req: Request, res: Response){
    try{
        const estoqueList = estoqueService.listaEstoque()
        res.status(200).json(
        {
            message: "Lista dos Estoques Lançados:",
            estoqueList
        }
        )
    } catch(error : any){
        res.status(400).json({message: error.message})
    }
}

export function listaEstoqueID(req: Request, res: Response){
    try{
        const estoqueID: any = estoqueService.listaEstoqueID(req.params.id)
        res.status(200).json(
        {
            message: "Estoque encontrado:",
            estoqueID
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}

export function listaEstoqueIDCarro(req: Request, res: Response){
    try{
        const estoqueIDCarro: any = estoqueService.listaEstoqueIDCarro(req.params.id)
        res.status(200).json(
        {
            message: "Estoque encontrado:",
            estoqueIDCarro
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}


export function atualizaEstoque(req: Request, res: Response){
    try{
        const estoqueAtualizado = estoqueService.atualizaEstoque(req.params.id,req.body)
        res.status(200).json(
        {
            message: "Estoque Atualizado: ",
            estoqueAtualizado
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}

export function deletaEstoque(req: Request, res: Response){
    try{
        const estoqueDelete = estoqueService.deletaEstoque(req.params.id)
        res.status(200).json(
        {
            message: "Lista de Estoque Restantes: ",
            estoqueDelete
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}