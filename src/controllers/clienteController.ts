import { Request, Response } from "express"
import { ClienteService } from "../services/clienteService"

const clienteService = new ClienteService()

export function insereCliente(req: Request, res: Response){
    try {
        const newCliente = clienteService.insereCliente(req.body)
        res.status(201).json(
        {
            message: "Cliente cadastrado com sucesso!!!",
            cliente: newCliente
        }
        )
    } catch( error: any){
        res.status(400).json({message: error.message})
    }
}

export function listaClientes(req: Request, res: Response){
    try{
        const clientesList = clienteService.listaClientes()
        res.status(200).json(
        {
            message: "Lista de Clientes Cadastrados:",
            clientesList
        }
        )
    } catch(error : any){
        res.status(400).json({message: error.message})
    }
}

export function listaClienteID(req: Request, res: Response){
    try{
        const clienteID: any = clienteService.listaClienteID(req.params.id)
        res.status(200).json(
        {
            message: "Cliente encontrado:",
            clienteID
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}

export function atualizaCliente(req: Request, res: Response){
    try{
        const clienteAtualizado = clienteService.atualizaCliente(req.params.id,req.body)
        res.status(200).json(
        {
            message: "Cliente Atualizado: ",
            clienteAtualizado
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}

export function deletaCliente(req: Request, res: Response){
    try{
        const clienteDelete = clienteService.deletaCliente(req.params.id)
        res.status(200).json(
        {
            message: "Lista de clientes restantes:",
            clienteDelete
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}

export function listaNotasCliente(req: Request, res: Response){
    try{
        const notasID = clienteService.listaNotasCliente(req.params.id)
        res.status(200).json(
        {
            message: "Notas do Cliente:",
            notasID
        }
        )
    } catch(error: any){
        res.status(400).json({message: error.message})
    }
}