import {Request, Response} from "express"
import { EstoqueService } from "../services/estoqueService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

export class EstoqueController {
    estoqueService = new EstoqueService()
    erroStatus = ErroStatusRepository.getInstance()

    async insereEstoque(req: Request, res: Response){
        try {
            const newEstoque = await this.estoqueService.insereEstoque(req.body)
            res.status(201).json(newEstoque)
        } catch( error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async listaEstoque(req: Request, res: Response){
        try{
            const estoqueList = await this.estoqueService.listaEstoque()
            res.status(200).json(estoqueList)
        } catch(error : any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async listaEstoqueID(req: Request, res: Response){
        try{
            const estoqueID: any = await this.estoqueService.listaEstoqueID(req.params.id)
            res.status(200).json(estoqueID)
        } catch(error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async listaEstoqueCarroID(req: Request, res: Response){
        try{
            const estoqueIDCarro: any = await this.estoqueService.listaEstoqueCarroID(req.params.id)
            res.status(200).json(estoqueIDCarro)
        } catch(error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async atualizaEstoque(req: Request, res: Response){
        try{
            const estoqueAtualizado = await this.estoqueService.atualizaEstoque(req.params.id,req.body)
            res.status(200).json(estoqueAtualizado)
        } catch(error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async deleteEstoque(req: Request, res: Response){
        try{
            const estoqueDelete = await this.estoqueService.deletaEstoque(req.params.id)
            res.status(200).json(estoqueDelete)
        } catch(error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }
}