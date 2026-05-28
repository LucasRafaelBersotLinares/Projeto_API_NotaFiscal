import { Cliente } from "../models/cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
export class ClienteService {
    clienteRepository: ClienteRepository = ClienteRepository.getInstance()

    insereCliente(clienteBody: any): Cliente{
        if(!clienteBody.nome || !clienteBody.cpf || !clienteBody.telefone){
            throw new Error("Dados obrigatórios faltantes!!!\n[Nome, CPF, Telefone]")
        }
        if(this.clienteRepository.cpfRepetido(clienteBody.cpf) === -1){
            return this.clienteRepository.insereCliente(clienteBody)
        }
        throw new Error("Sistema ja possui um cliente cadastrado neste CPF")
    }

    listaClientes(): Cliente[] {
        if(this.clienteRepository.listaClientes() === undefined){
            throw new Error("Nenhum Cleinte cadastrado.")
        }
        return this.clienteRepository.listaClientes()
    }

    listaClienteID(id: any): Cliente | undefined {
        if(this.clienteRepository.listaClienteID(Number(id)) === undefined){
            throw new Error("Cliente com este ID não existe no sistema.")
        }
        return this.clienteRepository.listaClienteID(Number(id))
    }   
}