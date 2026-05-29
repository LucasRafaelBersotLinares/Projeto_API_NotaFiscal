import { Request, Response } from "express"
import { CarroService } from "../services/carroService"

const carroService = new CarroService()

export function insereCarro(req: Request, res: Response){
    try {
        const newCarro = carroService.insereCarro(req.body)
        res.status(201).json(
        {
            message: "Carro cadastrado com sucesso!!!",
            carro: newCarro
        }
        )
    } catch( error: any){
        res.status(400).json({message: error.message})
    }
}

export function listaCarros(req: Request, res: Response){
    try{
        const carroList = carroService.listaCarros()
        res.status(200).json(
        {
            carroList
        }
        )
    } catch(error : any){
        res.status(400).json({message: error.message})
    }
}