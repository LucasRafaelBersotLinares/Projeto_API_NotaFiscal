import { Request, Response } from "express"
import { ClienteService } from "../services/clienteService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

export class ClienteController {

    clienteService = new ClienteService()
    erroStatus = ErroStatusRepository.getInstance()

    async insereCliente(req: Request, res: Response){
        try {
            const newCliente = await this.clienteService.insereCliente(req.body)
            res.status(201).json(newCliente)
        } catch( error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    listaClientes(req: Request, res: Response){
        try{
            const clientesList = this.clienteService.listaClientes()
            res.status(200).json(clientesList)
        } catch(error : any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    // listaClienteID(req: Request, res: Response){
    //     try{
    //         const clienteID: any = this.clienteService.listaClienteID(req.params.id)
    //         res.status(200).json(clienteID)
    //     } catch(error: any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }

    // atualizaCliente(req: Request, res: Response){
    //     try{
    //         const clienteAtualizado = this.clienteService.atualizaCliente(req.params.id,req.body)
    //         res.status(200).json(clienteAtualizado)
    //     } catch(error: any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }

    // deletaCliente(req: Request, res: Response){
    //     try{
    //         const clienteDelete = this.clienteService.deletaCliente(req.params.id)
    //         res.status(200).json(clienteDelete)
    //     } catch(error: any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }

    // listaNotasCliente(req: Request, res: Response){
    //     try{
    //         const notasID = this.clienteService.listaNotasCliente(req.params.id)
    //         res.status(200).json(notasID)
    //     } catch(error: any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }
}