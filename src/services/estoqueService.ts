import { Estoque } from "../models/estoque"
import { EstoqueRepository } from "../repositories/estoqueRepository"
import { CarroRepository } from "../repositories/carroRepository"

export class EstoqueService {
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()
    carroRepository: CarroRepository = CarroRepository.getInstance()

    insereEstoque(estoqueBody: any): Estoque {
        const dataAtual: string = new Date().toISOString()
        const dataEntrada: string = new Date(estoqueBody.data_entrada).toISOString()

        if(!estoqueBody.id_carro || estoqueBody.quantidade === undefined || !estoqueBody.localizacao_patio || !estoqueBody.data_entrada){
            throw new Error("Dados obrigatórios faltantes!!! [ID_carro, Quantidade, Localizacao_patio, Data_entrada]")
        }
        if(this.carroRepository.listaCarroID(estoqueBody.id_carro) === undefined){
            throw new Error("ID_carro nao consta no sistema, cadastre o veiculo antes de cria-lo no estoque.")
        }
        if(dataEntrada > dataAtual){
            throw new Error("A data de entrada nao pode ser uma data futura, coloque a data real que o carro entrou.")
        }
        if(estoqueBody.quantidade >= 0){
            if(this.estoqueRepository.idCarroDuplicado(estoqueBody.id_carro) === -1){
                return this.estoqueRepository.insereEstoque(estoqueBody)
            }
            throw new Error("Carro ja possui um estoque tivo com esse ID")
        }
        throw new Error("Quantidade deve ser maior ou igual a 0, numeros negativos nao sao aceitos.")
    }

    listaEstoque(): Estoque[] {
        if(this.estoqueRepository.listaEstoque() === undefined){
            throw new Error("Nenhum Estoque cadastrado.")
        }
        return this.estoqueRepository.listaEstoque()
    }

    listaEstoqueID(id: any): Estoque | undefined {
        if(this.estoqueRepository.listaEstoqueID(Number(id)) === undefined){
            throw new Error("Estoque com este ID não existe no sistema.")
        }
        return this.estoqueRepository.listaEstoqueID(Number(id))
    }  
    
    listaEstoqueIDCarro(id: any): Estoque | undefined {
        if(this.estoqueRepository.listaEstoqueIDCarro(Number(id)) === undefined){
            throw new Error("Estoque com este ID de carro não existe no sistema.")
        }
        return this.estoqueRepository.listaEstoqueIDCarro(Number(id))
    }

    atualizaEstoque(id: any, estoqueBody: any): Estoque | undefined {
        const dataAtual: string = new Date().toISOString()
        const dataEntrada: string = new Date(estoqueBody.data_entrada).toISOString()
        
        if(this.estoqueRepository.atualizaEstoque(Number(id),estoqueBody) === undefined)
            throw new Error("Estoque com este ID não existe no sistema.")
        if(this.carroRepository.listaCarroID(estoqueBody.id_carro) === undefined)
            throw new Error("ID_carro não consta no sistema, cadastre o veículo antes de criar um estoque.")
        if(dataEntrada > dataAtual)
            throw new Error("A data de entrada não pode ser uma data futura, coloque a data real que o carro entrou.")
        if(estoqueBody.quantidade >= 0)
            throw new Error("Quantidade que possuí de carro no estoque, deve ser maior ou igual a 0.")
        if(this.estoqueRepository.idCarroDuplicado(estoqueBody.id_carro) === -1)
            throw new Error("Este ID_carro já foi usado em um estoque anterior, apague o estoque anterior ou atualize o estoque anterior se for mudança de quantidade ou localização.")
        return this.estoqueRepository.atualizaEstoque(Number(id),estoqueBody)
    }

    deletaEstoque(id: any): Estoque[] | undefined{
        if(this.estoqueRepository.listaEstoqueID(Number(id)) === undefined){
            throw new Error("Estoque com este ID não existe no sistema.")
        }
        return this.estoqueRepository.deletaEstoque(Number(id))
    }

}