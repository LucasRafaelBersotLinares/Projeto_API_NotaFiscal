"use strict";
// import { Carro } from "../models/carro"
Object.defineProperty(exports, "__esModule", { value: true });
// export class CarroRepository {
//     private static instance: CarroRepository
//     private carroList: Carro[] = []
//     private constructor() {}
//     public static getInstance(): CarroRepository {
//         if(!this.instance){
//             this.instance = new CarroRepository()
//         }
//         return this.instance
//     }
//     listaCarros(): Carro[] {
//         return this.carroList
//     }
//     listaCarroID(id: number): Carro | undefined{
//         return this.carroList.find(carro => carro.id_carro === id)
//     }
//     placaRepetida(placa: string): number{
//         return this.carroList.findIndex(carro => carro.placa === placa)
//     }
//     insereCarro(carro: any): Carro {
//         const newCarro = new Carro(carro.marca,carro.modelo,carro.ano,carro.placa,carro.preco,carro.cor)
//         this.carroList.push(newCarro)
//         return newCarro
//     }
//     indexCarro(id: any){
//         return this.carroList.findIndex((carro => carro.id_carro === id))
//     }
//     atualizaCarro(id: number, carroBody: any): Carro | undefined {
//         let carroIndex: number = this.indexCarro(id)
//         this.carroList[carroIndex]!.marca = carroBody.marca ?? this.carroList[carroIndex]!.marca
//         this.carroList[carroIndex]!.modelo = carroBody.modelo ?? this.carroList[carroIndex]!.modelo
//         this.carroList[carroIndex]!.ano = carroBody.ano ?? this.carroList[carroIndex]!.ano
//         this.carroList[carroIndex]!.placa = carroBody.placa ?? this.carroList[carroIndex]!.placa
//         this.carroList[carroIndex]!.preco = carroBody.preco ?? this.carroList[carroIndex]!.preco
//         this.carroList[carroIndex]!.cor = carroBody.cor ?? this.carroList[carroIndex]!.cor
//         return this.carroList[carroIndex]
//     }
//     deletaCarro(id: number): Carro[] | undefined {
//         this.carroList = this.carroList.filter(carro => carro.id_carro != id)
//         return this.carroList
//     }
// }
//# sourceMappingURL=carroRepository.js.map