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
            throw new Error("Dados obrigatórios faltantes!!! [ID_carro, Quantidade, Localizacao_patio, Data_entrada].")
        }
        if(this.carroRepository.listaCarroID(estoqueBody.id_carro) === undefined){
            throw new Error("ID carro não consta no sistema, cadastre o veiculo antes de criar seu estoque.")
        }
        if(dataEntrada > dataAtual){
            throw new Error("A data de entrada não pode ser uma data futura, coloque a data real que o carro entrou.")
        }
        if(estoqueBody.quantidade >= 0){
            if(this.estoqueRepository.idCarroDuplicado(estoqueBody.id_carro) === -1){
                return this.estoqueRepository.insereEstoque(estoqueBody)
            }
            throw new Error("Carro já possuí um estoque ativo com esse ID.")
        }
        throw new Error("o campo quantidade deve ser maior ou igual a zero, números negativos não são aceitos.")
    }

    listaEstoque(): Estoque[] {
        if(this.estoqueRepository.listaEstoque() === undefined){
            throw new Error("Nenhum Estoque cadastrado.")
        }
        return this.estoqueRepository.listaEstoque()
    }

    listaEstoqueID(id: any): Estoque | undefined {
        if(this.estoqueRepository.listaEstoqueID(Number(id)) === undefined){
            throw new Error("Estoque com este ID, não existe no sistema.")
        }
        return this.estoqueRepository.listaEstoqueID(Number(id))
    }  
    
    listaEstoqueIDCarro(id: any): Estoque | undefined {
        if(this.estoqueRepository.listaEstoqueIDCarro(Number(id)) === undefined){
            throw new Error("Estoque com este ID de carro, não existe no sistema.")
        }
        return this.estoqueRepository.listaEstoqueIDCarro(Number(id))
    }

    atualizaEstoque(id: any, estoqueBody: any): Estoque | undefined {   
        if(this.estoqueRepository.indexEstoque(Number(id)) === -1)
            throw new Error("Estoque com este ID, não existe no sistema.")
        if(!(estoqueBody.quantidade >= 0))
            throw new Error("O campo quantidade de carro no estoque, deve ser maior ou igual a zero.")
        return this.estoqueRepository.atualizaEstoque(Number(id),estoqueBody)
    }

    deletaEstoque(id: any): Estoque[] | undefined{
        if(this.estoqueRepository.listaEstoqueID(Number(id)) === undefined){
            throw new Error("Estoque com este ID, não existe no sistema.")
        }
        return this.estoqueRepository.deletaEstoque(Number(id))
    }

}