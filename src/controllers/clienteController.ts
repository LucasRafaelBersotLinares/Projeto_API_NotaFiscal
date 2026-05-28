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
            clientesList
        }
        )
    } catch(error : any){
        res.status(400).json({message: error.message})
    }
}

