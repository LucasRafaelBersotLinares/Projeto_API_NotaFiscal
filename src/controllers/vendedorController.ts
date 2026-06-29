import { Request, Response } from "express"
import { VendedorService } from "../services/vendedorService"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

export class VendedorController {
    vendedorService = new VendedorService()
    erroStatus = ErroStatusRepository.getInstance()

    async insereVendedor(req: Request, res: Response){
        try {
            const newVendedor = await this.vendedorService.insereVendedor(req.body)
            res.status(201).json(newVendedor)
        } catch( error: any){
            res.status(this.erroStatus.mostraErro()).json({message: error.message})
        }
    }

    // listaVendedores(req: Request, res: Response){
    //     try{
    //         const vendedorList = this.vendedorService.listaVendedores()
    //         res.status(200).json(vendedorList)
    //     } catch(error : any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }

    // listaVendedorID(req: Request, res: Response){
    //     try{
    //         const vendedorID: any = this.vendedorService.listaVendedorID(req.params.id)
    //         res.status(200).json(vendedorID)
    //     } catch(error: any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }

    // atualizaVendedor(req: Request, res: Response){
    //     try{
    //         const vendedorAtualizado = this.vendedorService.atualizaVendedor(req.params.id,req.body)
    //         res.status(200).json(vendedorAtualizado)
    //     } catch(error: any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }

    // deletaVendedor(req: Request, res: Response){
    //     try{
    //         const vendedorDelete = this.vendedorService.deletaVendedor(req.params.id)
    //         res.status(200).json(vendedorDelete)
    //     } catch(error: any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }

    // listaNotasVendedor(req: Request, res: Response){
    //     try{
    //         const notasID = this.vendedorService.listaNotasVendedor(req.params.id)
    //         res.status(200).json(notasID)
    //     } catch(error: any){
    //         res.status(this.erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }
}