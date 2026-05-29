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
            estoqueList
        }
        )
    } catch(error : any){
        res.status(400).json({message: error.message})
    }
}