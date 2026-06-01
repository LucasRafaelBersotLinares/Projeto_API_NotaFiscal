import { Cliente } from "../models/cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
export class ClienteService {
    clienteRepository: ClienteRepository = ClienteRepository.getInstance()
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()

    insereCliente(clienteBody: any): Cliente{
        if(!clienteBody.nome || !clienteBody.cpf || !clienteBody.telefone){
            throw new Error("Dados obrigatórios faltantes!!! [Nome, CPF, Telefone]")
        }
        if(this.clienteRepository.cpfRepetido(clienteBody.cpf) === -1){
            return this.clienteRepository.insereCliente(clienteBody)
        }
        throw new Error("Sistema ja possui um cliente cadastrado neste CPF")
    }

    listaClientes(): Cliente[] {
        if(this.clienteRepository.listaClientes() === undefined){
            throw new Error("Nenhum Cliente cadastrado.")
        }
        return this.clienteRepository.listaClientes()
    }

    listaClienteID(id: any): Cliente | undefined {
        if(this.clienteRepository.listaClienteID(Number(id)) === undefined){
            throw new Error("Cliente com este ID não existe no sistema.")
        }
        return this.clienteRepository.listaClienteID(Number(id))
    }   

    atualizaCliente(id: any, clienteBody: any): Cliente | undefined {
        if(this.clienteRepository.atualizaCliente(Number(id),clienteBody) === undefined){
            throw new Error("Cliente com este ID não existe no sistema.")
        }
        return this.clienteRepository.atualizaCliente(Number(id),clienteBody)
    }

    deletaCliente(id: any): Cliente[] | undefined {
        if(this.clienteRepository.listaClienteID(Number(id)) === undefined){
            throw new Error("Cliente com este ID não está cadastrado no sistema.")
        }
        if(this.notaRepository.verificaNotaIDtabela(id,"cliente") != -1){
            throw new Error("Cliente não pode ser excluído por conta que tem nota emitida.")
        }
        return this.clienteRepository.deletaCliente(id)
    }

}