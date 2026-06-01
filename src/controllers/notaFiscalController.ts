import { Request, Response } from "express"
import { NotaFiscalService } from "../services/notaFiscalService"

const notaService = new NotaFiscalService()

export function emiteNota(req: Request, res: Response){
    try {
        const newNota = notaService.emiteNota(req.body)
        res.status(201).json(
        {
            message: "Nota emitida com sucesso!!!",
            cliente: newNota
        }
        )
    } catch( error: any){
        res.status(400).json({message: error.message})
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
        res.status(400).json({message: error.message})
    }
}