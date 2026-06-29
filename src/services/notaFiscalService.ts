import { NotaFiscal } from "../models/notaFiscal"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
import { CarroRepository } from "../repositories/carroRepository"
import { VendedorRepository } from "../repositories/vendedorRepository"
import { ClienteRepository } from "../repositories/clienteRepository"
import { EstoqueRepository } from "../repositories/estoqueRepository"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"


export class NotaFiscalService {
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    carroRepository = CarroRepository.getInstance()
    vendedorRepository = VendedorRepository.getInstance()
    clienteRepository = ClienteRepository.getInstance()
    estoqueRepository = EstoqueRepository.getInstance()
    erroStatus: ErroStatusRepository = ErroStatusRepository.getInstance()

    verificarExistencia( tabela: string, valor: any): number {
        switch(tabela){
            case "id_carro":
                return this.carroRepository.indexCarro(valor)
            case "id_vendedor":
                return this.vendedorRepository.indexVendedor(valor)
            case "id_cliente":
                return 1 //this.clienteRepository.indexCliente(valor)
            default:
                return -1
        }
    }
    
    emiteNota(notaBody: any): NotaFiscal | undefined{
        const dataAtual: string = new Date().toISOString()
        const dataEntrada: Date = new Date(notaBody.data_emissao)

        if (isNaN(dataEntrada.getTime())) {
            this.erroStatus.insereErro(400)
            throw new Error("Formato de data inválido use [yyyy-mm-dd]")
        }   
        if(!notaBody.numero_nota || !notaBody.data_emissao || !notaBody.valor_total || !notaBody.id_cliente || !notaBody.id_vendedor || !notaBody.id_carro){
            this.erroStatus.insereErro(400)
            throw new Error("Dados obrigatórios faltantes!!! [Numero da nota, Data emissao, Valor total, ID Cliente, ID Vendedor, ID Carro].")
        }
        if(!(notaBody.valor_total > 0)){
            this.erroStatus.insereErro(400)
            throw new Error("O campo valor total, deve ser maior que zero.")
        }
        if(dataEntrada.toISOString() > dataAtual){
            this.erroStatus.insereErro(400)
            throw new Error("A data de emissão não pode ser uma data futura, coloque a data real que a nota foi emitida.")
        }
        if(this.verificarExistencia("id_carro", notaBody.id_carro) === -1 || this.verificarExistencia("id_vendedor", notaBody.id_vendedor) === -1 || this.verificarExistencia("id_cliente", notaBody.id_cliente) === -1 ){
            this.erroStatus.insereErro(404)
            throw new Error("O ID Carro, ID Vendedor e ID Cliente já deve estar previamente cadastrado no sistema.")
        }
        const estoqueCarro = this.estoqueRepository.listaEstoqueIDCarro(notaBody.id_carro)
        if(estoqueCarro === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("O Carro deve estar cadastrado no estoque.")
        }
        if(estoqueCarro.quantidade > 0){
            this.estoqueRepository.diminuirEstoque(estoqueCarro.id_estoque)
            if(this.notaRepository.notaDuplicada(notaBody.numero_nota) === -1){
                return this.notaRepository.emiteNota(notaBody)
            }
            this.erroStatus.insereErro(409)
            throw new Error("Esse número de nota está vinculada a uma existente. ")
        }
        this.erroStatus.insereErro(422)
        throw new Error("A quantidade do carro que está no estoque é igual a 0, não pode vender esse carro.")
    }

    listaNotas(): NotaFiscal[] {
        if(this.notaRepository.listaNotas() === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Nenhuma Nota emitida.")
        }
        return this.notaRepository.listaNotas() 
    }

    listaNotaID(id: any): NotaFiscal | undefined {
        if(this.notaRepository.listaNotaID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Não existe nota emitida com este ID.")
        }
        return this.notaRepository.listaNotaID(Number(id))
    }

}

