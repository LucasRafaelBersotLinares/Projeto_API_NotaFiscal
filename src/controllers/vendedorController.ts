import { Request, Response } from "express"
import { VendedorService } from "../services/vendedorService"

const vendedorService = new VendedorService()

export function insereVendedor(req: Request, res: Response){
    try {
        const newVendedor = vendedorService.insereVendedor(req.body)
        res.status(201).json(
        {
            message: "Vendedor cadastrado com sucesso!!!",
            vendedor: newVendedor
        }
        )
    } catch( error: any){
        res.status(400).json({message: error.message})
    }
}

export function listaVendedores(req: Request, res: Response){
    try{
        const vendedorList = vendedorService.listaVendedores()
        res.status(200).json(
        {
            vendedorList
        }
        )
    } catch(error : any){
        res.status(400).json({message: error.message})
    }
}

export function listaVendedorID(req: Request, res: Response){
    try{
        const vendedorID: any = vendedorService.listaVendedorID(req.params.id)
        res.status(200).json(
        {
            message: "Vendedor:",
            vendedorID
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}

export function atualizaVendedor(req: Request, res: Response){
    try{
        const vendedorAtualizado = vendedorService.atualizaVendedor(req.params.id,req.body)
        res.status(200).json(
        {
            message: "Vendedor Atualizado: ",
            vendedorAtualizado
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}

export function deletaVendedor(req: Request, res: Response){
    try{
        const vendedorDelete = vendedorService.deletaVendedor(req.params.id)
        res.status(200).json(
        {
            message: "Lista de vendedores restantes:",
            vendedorDelete
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}