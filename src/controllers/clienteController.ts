import { Request, Response } from "express"
import { ClienteService } from "../services/clienteService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

const clienteService = new ClienteService()
const erroStatus = ErroStatusRepository.getInstance()

export function insereCliente(req: Request, res: Response){
    try {
        const newCliente = clienteService.insereCliente(req.body)
        res.status(201).json(newCliente)
    } catch( error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaClientes(req: Request, res: Response){
    try{
        const clientesList = clienteService.listaClientes()
        res.status(200).json(clientesList)
    } catch(error : any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaClienteID(req: Request, res: Response){
    try{
        const clienteID: any = clienteService.listaClienteID(req.params.id)
        res.status(200).json(clienteID)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function atualizaCliente(req: Request, res: Response){
    try{
        const clienteAtualizado = clienteService.atualizaCliente(req.params.id,req.body)
        res.status(200).json(clienteAtualizado)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function deletaCliente(req: Request, res: Response){
    try{
        const clienteDelete = clienteService.deletaCliente(req.params.id)
        res.status(200).json(clienteDelete)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaNotasCliente(req: Request, res: Response){
    try{
        const notasID = clienteService.listaNotasCliente(req.params.id)
        res.status(200).json(notasID)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}