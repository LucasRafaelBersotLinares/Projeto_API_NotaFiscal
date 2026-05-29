import { Carro } from "../models/carro"

export class CarroRepository {
    private static instance: CarroRepository
    private carroList: Carro[] = []
    private constructor() {}

    public static getInstance(): CarroRepository {
        if(!this.instance){
            this.instance = new CarroRepository()
        }
        return this.instance
    }

    listaCarros(): Carro[] {
        return this.carroList
    }

    placaRepetida(placa: string): number{
        return this.carroList.findIndex(carro => carro.placa === placa)
    }

    insereCarro(carro: Carro): Carro {
        const newCarro = new Carro(carro.marca,carro.modelo,carro.ano,carro.placa,carro.preco,carro.cor)
        this.carroList.push(newCarro)
        return newCarro
    }

}