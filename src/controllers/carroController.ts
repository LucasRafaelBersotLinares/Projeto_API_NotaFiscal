import { Request, Response } from "express"
import { CarroService } from "../services/carroService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

const carroService = new CarroService()
const erroStatus = ErroStatusRepository.getInstance()

export function insereCarro(req: Request, res: Response){
    try {
        const newCarro = carroService.insereCarro(req.body)
        res.status(201).json(newCarro)
    } catch( error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaCarros(req: Request, res: Response){
    try{
        const carroList = carroService.listaCarros()
        res.status(200).json(carroList)
    } catch(error : any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaCarroID(req: Request, res: Response){
    try{
        const carroID: any = carroService.listaCarroID(req.params.id)
        res.status(200).json(carroID)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaCarroDisponiveis(req: Request, res: Response){
    try{
        const carrosDisponiveis: any = carroService.listaCarroDisponivel()
        res.status(200).json(carrosDisponiveis)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function atualizaCarro(req: Request, res: Response){
    try{
        const carroAtualizado = carroService.atualizaCarro(req.params.id,req.body)
        res.status(200).json(carroAtualizado)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function deletaCarro(req: Request, res: Response){
    try{
        const carroDelete = carroService.deletaCarro(req.params.id)
        res.status(200).json(carroDelete)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}