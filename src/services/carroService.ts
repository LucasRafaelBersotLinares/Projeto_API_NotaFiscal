import { Carro } from "../models/carro"
import { CarroRepository } from "../repositories/carroRepository"

export class CarroService {
    carroRepository: CarroRepository = CarroRepository.getInstance()

    insereCarro(carroBody: any): Carro{
        if(!carroBody.marca || !carroBody.modelo || !carroBody.ano || !carroBody.placa || !carroBody.preco || !carroBody.cor){
            throw new Error("Dados obrigatórios faltantes!!!\n[Marca, Modelo, Ano, Placa, Preco, Cor]")
        }
        if(this.carroRepository.placaRepetida(carroBody.placa) === -1){
            return this.carroRepository.insereCarro(carroBody)
        }
        throw new Error("Sistema ja possui um carro cadastrado nesta placa")
    }


}