import { Request, Response } from "express"
import { NotaFiscalService } from "../services/notaFiscalService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

const notaService = new NotaFiscalService()
const erroStatus = ErroStatusRepository.getInstance()

export function emiteNota(req: Request, res: Response){
    try {
        const newNota = notaService.emiteNota(req.body)
        res.status(201).json(
        {
            newNota
        }
        )
    } catch( error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaNotas(req: Request, res: Response){
    try{
        const notasList = notaService.listaNotas()
        res.status(200).json(
        {
            notasList
        }
        )
    } catch(error : any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaNotaID(req: Request, res: Response){
    try{
        const notaID: any = notaService.listaNotaID(req.params.id)
        res.status(200).json(
        {
            notaID
        }
        )
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}