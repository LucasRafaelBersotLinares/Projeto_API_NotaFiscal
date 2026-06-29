import { Request, Response } from "express"
import { NotaFiscalService } from "../services/notaFiscalService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

const notaService = new NotaFiscalService()
const erroStatus = ErroStatusRepository.getInstance()

export class NotaController {
    async emiteNota(req: Request, res: Response){
        try {
            const newNota = await notaService.emiteNota(req.body)
            res.status(201).json(newNota)
        } catch( error: any){
            res.status(erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async listaNotas(req: Request, res: Response){
        try{
            const notasList = await notaService.listaNotas()
            res.status(200).json(notasList)
        } catch(error : any){
            res.status(erroStatus.mostraErro()).json({message: error.message})
        }
    }

    async listaNotaID(req: Request, res: Response){
        try{
            const notaID: any = await notaService.listaNotaID(req.params.id)
            res.status(200).json(notaID)
        } catch(error: any){
            res.status(erroStatus.mostraErro()).json({message: error.message})
        }
    }
}