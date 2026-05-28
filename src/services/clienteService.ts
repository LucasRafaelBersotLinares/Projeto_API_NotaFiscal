import { Cliente } from "../models/cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
export class ClienteService {
    clienteRepository: ClienteRepository = ClienteRepository.getInstance()

    insereCliente(clienteBody: any){
        if(!clienteBody.nome || !clienteBody.cpf || !clienteBody.telefone){
            throw new Error("Dados obrigatórios faltantes!!!\n[Nome, CPF, Telefone]")
        }
        if(this.clienteRepository.cpfRepetido(clienteBody.cpf) === undefined){
            this.clienteRepository.insereCliente(clienteBody)
        }
        throw new Error("Sistema ja possui um cliente cadastrado neste CPF")
    }
}