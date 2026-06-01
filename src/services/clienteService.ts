import { Cliente } from "../models/cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
import { NotaFiscal } from "../models/notaFiscal"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"
export class ClienteService {
    clienteRepository: ClienteRepository = ClienteRepository.getInstance()
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    erroStatus: ErroStatusRepository = ErroStatusRepository.getInstance()

    insereCliente(clienteBody: any): Cliente{
        if(!clienteBody.nome || !clienteBody.cpf || !clienteBody.telefone){
            this.erroStatus.insereErro(400)
            throw new Error("Dados obrigatórios faltantes!!! [Nome, CPF, Telefone].")
        }
        if(this.clienteRepository.cpfRepetido(clienteBody.cpf) === -1){
            return this.clienteRepository.insereCliente(clienteBody)
        }
        this.erroStatus.insereErro(409)
        throw new Error("Sistema já possuí um cliente cadastrado neste CPF.")
    }

    listaClientes(): Cliente[] {
        if(this.clienteRepository.listaClientes() === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Nenhum Cliente cadastrado.")
        }
        return this.clienteRepository.listaClientes()
    }

    listaClienteID(id: any): Cliente | undefined {
        if(this.clienteRepository.listaClienteID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Cliente com este ID, não existe no sistema.")
        }
        return this.clienteRepository.listaClienteID(Number(id))
    }   

    atualizaCliente(id: any, clienteBody: any): Cliente | undefined {
        if(this.clienteRepository.indexCliente(Number(id)) === -1){
            this.erroStatus.insereErro(404)
            throw new Error("Cliente com este ID, não existe no sistema.")
        }
        if(this.clienteRepository.cpfRepetido(clienteBody.cpf) != -1){
            this.erroStatus.insereErro(409)
            throw new Error("Não pode atualizar o CPF de um cliente que já tenha outro cadastrado. Use CPF diferente.")
        }
        return this.clienteRepository.atualizaCliente(Number(id),clienteBody)
    }

    deletaCliente(id: any): Cliente[] | undefined {
        if(this.clienteRepository.listaClienteID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Cliente com este ID, não está cadastrado no sistema.")
        }
        if(this.notaRepository.verificaNotaIDtabela(Number(id),"cliente") != -1){
            this.erroStatus.insereErro(422)
            throw new Error("Cliente não pode ser excluído por conta que tem nota emitida.")
        }
        return this.clienteRepository.deletaCliente(id)
    }

    listaNotasCliente(id: any): NotaFiscal[] | undefined {
        if(this.notaRepository.listaNotasporTabela(id,"cliente")!.length === 0){
            this.erroStatus.insereErro(404)
            throw new Error("Cliente não possuí notas emitidas no sistema.")
        }
        return this.notaRepository.listaNotasporTabela(id,"cliente")
    }
}