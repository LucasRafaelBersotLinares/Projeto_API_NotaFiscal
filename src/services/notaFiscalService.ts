import { NotaFiscal } from "../models/notaFiscal"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
import { CarroRepository } from "../repositories/carroRepository"
import { VendedorRepository } from "../repositories/vendedorRepository"
import { ClienteRepository } from "../repositories/clienteRepository"
import { EstoqueRepository } from "../repositories/estoqueRepository"


export class NotaFiscalService {
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    carroRepository = CarroRepository.getInstance()
    vendedorRepository = VendedorRepository.getInstance()
    clienteRepository = ClienteRepository.getInstance()
    estoqueRepository = EstoqueRepository.getInstance()

    verificarExistencia( tabela: string, valor: any): number {
        switch(tabela){
            case "id_carro":
                return this.carroRepository.indexCarro(valor)
            case "id_vendedor":
                return this.vendedorRepository.indexVendedor(valor)
            case "id_cliente":
                return this.clienteRepository.indexCliente(valor)
            default:
                return -1
        }
    }
    
    emiteNota(notaBody: any): NotaFiscal | undefined{
        const dataAtual: string = new Date().toISOString()
        const dataEntrada: string = new Date(notaBody.data_emissao).toISOString()

        if(!notaBody.numero_nota || !notaBody.data_emissao || !notaBody.valor_total || !notaBody.id_cliente || !notaBody.id_vendedor || !notaBody.id_carro){
            throw new Error("Dados obrigatórios faltantes!!! [Numero da nota, Data emissao, Valor total, ID Cliente, ID Vendedor, ID Carro")
        }
        if(!(notaBody.valor_total > 0)){
            throw new Error("Valor total deve ser maior que zero.")
        }
        if(dataEntrada > dataAtual){
            throw new Error("A data de emissao nao pode ser uma data futura, coloque a data real que a nota foi emitida.")
        }
        if(this.verificarExistencia("id_carro", notaBody.id_carro) === -1 || this.verificarExistencia("id_vendedor", notaBody.id_vendedor) === -1 || this.verificarExistencia("id_cliente", notaBody.id_cliente) === -1 ){
            throw new Error("O ID Carro, ID Vendedor e ID Cliente devem já estar previamente cadastrados no sistema.")
        }
        const estoqueCarro = this.estoqueRepository.listaEstoqueIDCarro(notaBody.id_carro)
        if(estoqueCarro === undefined){
            throw new Error("O Carro deve estar cadastrado no estoque.")
        }
        if(estoqueCarro.quantidade > 0){
            this.estoqueRepository.diminuirEstoque(estoqueCarro.id_estoque)
            if(this.notaRepository.notaDuplicada(notaBody.numero_nota) === -1){
                return this.notaRepository.emiteNota(notaBody)
            }
            throw new Error("Esse núemro de nota está vinculada a uma existente. ")
        }
        throw new Error("A quantidade do carro que está no estoque é igual a 0, não pode vender esse carro.")
    }

    listaNotas(): NotaFiscal[] {
        if(this.notaRepository.listaNotas() === undefined){
            throw new Error("Nenhuma Nota emitida.")
        }
        return this.notaRepository.listaNotas()
    }


}

