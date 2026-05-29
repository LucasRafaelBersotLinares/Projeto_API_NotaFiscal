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

    listaEstoque(): Estoque[] {
        return this.estoqueList
    }

    listaEstoqueID(id: number): Estoque | undefined{
        return this.estoqueList.find(estoque => estoque.id_estoque === id)
    }

    listaEstoqueIDCarro(id_carro: number): Estoque | undefined{
        return this.estoqueList.find(estoque => estoque.id_carro === id_carro)
    }

    atualizaEstoque(id: number, estoqueBody: any): Estoque | undefined {
        let estoqueIndex: number = this.estoqueList.findIndex((estoque => estoque.id_estoque === id))

        if(estoqueIndex === -1){
            return undefined
        }
        this.estoqueList[estoqueIndex]!.quantidade = estoqueBody.quantidade ?? this.estoqueList[estoqueIndex]!.quantidade
        this.estoqueList[estoqueIndex]!.localizacao_patio = estoqueBody.localizacao_patio ?? this.estoqueList[estoqueIndex]!.localizacao_patio
        return this.estoqueList[estoqueIndex]
    }


}