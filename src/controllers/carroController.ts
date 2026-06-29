import { Request, Response } from "express"
import { CarroService } from "../services/carroService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

export class CarroController {
    carroService = new CarroService()
    erroStatus = ErroStatusRepository.getInstance()


    async insereCarro(req: Request, res: Response){
        try {
            const newCarro = await this.carroService.insereCarro(req.body)
            res.status(201).json(newCarro)
        } catch( error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async listaCarros(req: Request, res: Response){
        try{
            const carroList = await this.carroService.listaCarros()
            res.status(200).json(carroList)
        } catch(error : any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async listaCarroID(req: Request, res: Response){
        try{
            const carroID: any = await this.carroService.listaCarroID(req.params.id)
            res.status(200).json(carroID)
        } catch(error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async listaCarroDisponivel(req: Request, res: Response){
        try{
            const carrosDisponiveis: any = await this.carroService.listaCarroDisponivel()
            res.status(200).json(carrosDisponiveis)
        } catch(error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async atualizaCarro(req: Request, res: Response){
        try{
            const carroAtualizado = await this.carroService.atualizaCarro(req.params.id,req.body)
            res.status(200).json(carroAtualizado)
        } catch(error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async deleteCarro(req: Request, res: Response){
        try{
            const carroDelete = await this.carroService.deleteCarro(req.params.id)
            res.status(200).json(carroDelete)
        } catch(error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }
}