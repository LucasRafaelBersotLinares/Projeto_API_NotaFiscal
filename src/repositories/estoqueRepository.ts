import { Estoque } from "../models/estoque"

export class EstoqueRepository {
    private static instance: EstoqueRepository
    private estoqueList: Estoque[] = []
    private constructor() {}

    public static getInstance(): EstoqueRepository {
        if(!this.instance){
            this.instance = new EstoqueRepository()
        }
        return this.instance
    }

    insereEstoque(estoque: any): Estoque {
        const newEstoque = new Estoque(estoque.id_carro,estoque.quantidade,estoque.localizacao_patio,estoque.data_entrada)
        this.estoqueList.push(newEstoque)
        return newEstoque
    }

    idCarroDuplicado(id: number): number {
        return this.estoqueList.findIndex(estoque => estoque.id_carro === id)
    }




}