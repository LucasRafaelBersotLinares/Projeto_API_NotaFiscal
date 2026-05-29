import { Cliente } from "../models/cliente"

export class ClienteRepository {
    private static instance: ClienteRepository
    private clienteList: Cliente[] = []
    private constructor() {}

    public static getInstance(): ClienteRepository {
        if(!this.instance){
            this.instance = new ClienteRepository()
        }
        return this.instance
    }

    listaClientes(): Cliente[] {
        return this.clienteList
    }

    listaClienteID(id: number): Cliente | undefined{
        return this.clienteList.find(cliente => cliente.id_cliente === id)
    }

    cpfRepetido(cpf: string): number{
        return this.clienteList.findIndex(cliente => cliente.cpf === cpf)
    }

    insereCliente(cliente: any): Cliente {
        const newCliente = new Cliente(cliente.nome,cliente.cpf,cliente.telefone,cliente.email,cliente.cidade)
        this.clienteList.push(newCliente)
        return newCliente
    }

    atualizaCliente(id: number, clienteBody: any): Cliente | undefined {
        let clienteIndex: number = this.clienteList.findIndex((cliente => cliente.id_cliente === id))

        if(clienteIndex === -1){
            return undefined
        }
        this.clienteList[clienteIndex]!.nome = clienteBody.nome ?? this.clienteList[clienteIndex]!.nome
        this.clienteList[clienteIndex]!.cpf = clienteBody.cpf ?? this.clienteList[clienteIndex]!.cpf
        this.clienteList[clienteIndex]!.email = clienteBody.email ?? this.clienteList[clienteIndex]!.email
        this.clienteList[clienteIndex]!.cidade = clienteBody.cidade ?? this.clienteList[clienteIndex]!.cidade
        this.clienteList[clienteIndex]!.telefone = clienteBody.telefone ?? this.clienteList[clienteIndex]!.telefone
        return this.clienteList[clienteIndex]
    }

    deletaCliente(id: number): Cliente[] | undefined {
        return this.clienteList = this.clienteList.filter(cliente => cliente.id_cliente != id)
    }
}