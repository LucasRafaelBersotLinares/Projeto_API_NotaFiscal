"use strict";
// import { Estoque } from "../models/estoque"
Object.defineProperty(exports, "__esModule", { value: true });
// export class EstoqueRepository {
//     private static instance: EstoqueRepository
//     private estoqueList: Estoque[] = []
//     private constructor() {}
//     public static getInstance(): EstoqueRepository {
//         if(!this.instance){
//             this.instance = new EstoqueRepository()
//         }
//         return this.instance
//     }
//     insereEstoque(estoque: any): Estoque {
//         const newEstoque = new Estoque(estoque.id_carro,estoque.quantidade,estoque.localizacao_patio,estoque.data_entrada)
//         this.estoqueList.push(newEstoque)
//         return newEstoque
//     }
//     indexEstoque(id: number){
//         return this.estoqueList.findIndex(estoque => estoque.id_estoque === id)
//     }
//     idCarroDuplicado(id: number): number {
//         return this.estoqueList.findIndex(estoque => estoque.id_carro === id)
//     }
//     listaEstoque(): Estoque[] {
//         return this.estoqueList
//     }
//     listaEstoqueID(id: number): Estoque | undefined{
//         return this.estoqueList.find(estoque => estoque.id_estoque === id)
//     }
//     listaEstoqueIDCarro(id_carro: number): Estoque | undefined{
//         return this.estoqueList.find(estoque => estoque.id_carro === id_carro)
//     }
//     listaCarroDisponivel(id_carro: number): Estoque | undefined {
//         return this.estoqueList.find(estoque => estoque.id_carro === id_carro)
//     }
//     atualizaEstoque(id: number, estoqueBody: any): Estoque | undefined {
//         let estoqueIndex: number = this.indexEstoque(Number(id))
//         this.estoqueList[estoqueIndex]!.quantidade = estoqueBody.quantidade ?? this.estoqueList[estoqueIndex]!.quantidade
//         this.estoqueList[estoqueIndex]!.localizacao_patio = estoqueBody.localizacao_patio ?? this.estoqueList[estoqueIndex]!.localizacao_patio
//         return this.estoqueList[estoqueIndex]
//     }
//     deletaEstoque(id: number): Estoque[] | undefined {
//         this.estoqueList = this.estoqueList.filter(estoque => estoque.id_estoque != id)
//         return this.estoqueList
//     }
//     diminuirEstoque(id: number){
//         let estoqueIndex: number = this.estoqueList.findIndex(estoque => estoque.id_estoque === id)
//         this.estoqueList[estoqueIndex]!.quantidade -= 1
//     }
// }
//# sourceMappingURL=estoqueRepository.js.map