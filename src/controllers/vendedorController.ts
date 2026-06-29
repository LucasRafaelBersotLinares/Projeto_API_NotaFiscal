import { Request, Response } from "express"
import { VendedorService } from "../services/vendedorService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

const vendedorService = new VendedorService()
const erroStatus = ErroStatusRepository.getInstance()

export function insereVendedor(req: Request, res: Response){
    try {
        const newVendedor = vendedorService.insereVendedor(req.body)
        res.status(201).json(newVendedor)
    } catch( error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaVendedores(req: Request, res: Response){
    try{
        const vendedorList = vendedorService.listaVendedores()
        res.status(200).json(vendedorList)
    } catch(error : any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaVendedorID(req: Request, res: Response){
    try{
        const vendedorID: any = vendedorService.listaVendedorID(req.params.id)
        res.status(200).json(vendedorID)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function atualizaVendedor(req: Request, res: Response){
    try{
        const vendedorAtualizado = vendedorService.atualizaVendedor(req.params.id,req.body)
        res.status(200).json(vendedorAtualizado)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function deletaVendedor(req: Request, res: Response){
    try{
        const vendedorDelete = vendedorService.deletaVendedor(req.params.id)
        res.status(200).json(vendedorDelete)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}

export function listaNotasVendedor(req: Request, res: Response){
    try{
        const notasID = vendedorService.listaNotasVendedor(req.params.id)
        res.status(200).json(notasID)
    } catch(error: any){
        res.status(erroStatus.mostraErro()).json({message: error.message})
    }
}