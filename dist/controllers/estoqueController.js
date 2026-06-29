"use strict";
// import {Request, Response} from "express"
// import { EstoqueService } from "../services/estoqueService"
// import { ErroStatusRepository } from "../repositories/erroStatusRepository"
Object.defineProperty(exports, "__esModule", { value: true });
// const estoqueService = new EstoqueService()
// const erroStatus = ErroStatusRepository.getInstance()
// export function insereEstoque(req: Request, res: Response){
//     try {
//         const newEstoque = estoqueService.insereEstoque(req.body)
//         res.status(201).json(newEstoque)
//     } catch( error: any){
//         res.status(erroStatus.mostraErro()).json({message: error.message})
//     }
// }
// export function listaEstoque(req: Request, res: Response){
//     try{
//         const estoqueList = estoqueService.listaEstoque()
//         res.status(200).json(estoqueList)
//     } catch(error : any){
//         res.status(erroStatus.mostraErro()).json({message: error.message})
//     }
// }
// export function listaEstoqueID(req: Request, res: Response){
//     try{
//         const estoqueID: any = estoqueService.listaEstoqueID(req.params.id)
//         res.status(200).json(estoqueID)
//     } catch(error: any){
//         res.status(erroStatus.mostraErro()).json({message: error.message})
//     }
// }
// export function listaEstoqueIDCarro(req: Request, res: Response){
//     try{
//         const estoqueIDCarro: any = estoqueService.listaEstoqueIDCarro(req.params.id)
//         res.status(200).json(estoqueIDCarro)
//     } catch(error: any){
//         res.status(erroStatus.mostraErro()).json({message: error.message})
//     }
// }
// export function atualizaEstoque(req: Request, res: Response){
//     try{
//         const estoqueAtualizado = estoqueService.atualizaEstoque(req.params.id,req.body)
//         res.status(200).json(estoqueAtualizado)
//     } catch(error: any){
//         res.status(erroStatus.mostraErro()).json({message: error.message})
//     }
// }
// export function deletaEstoque(req: Request, res: Response){
//     try{
//         const estoqueDelete = estoqueService.deletaEstoque(req.params.id)
//         res.status(200).json(estoqueDelete)
//     } catch(error: any){
//         res.status(erroStatus.mostraErro()).json({message: error.message})
//     }
// }
//# sourceMappingURL=estoqueController.js.map