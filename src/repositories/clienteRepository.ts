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

    listaClienteID(id: number): Cliente | undefined {
        return this.clienteList.find(cliente => cliente.id_cliente === id)
    }

    cpfRepetido(cpf: string): number{
        return this.clienteList.findIndex(cliente => cliente.cpf === cpf)
    }

    insereCliente(cliente: Cliente) {
        this.clienteList.push(cliente)
    }

    atualizaCliente(id: number, cliente: Cliente): Cliente | undefined {
        let clienteIndex: number = this.clienteList.findIndex((cliente => cliente.id_cliente === id))

        if(clienteIndex === -1){
            return undefined
        }
        this.clienteList[clienteIndex] = cliente
    }

    deletaCliente(id: number): Cliente[] | undefined {
        return this.clienteList = this.clienteList.filter(cliente => cliente.id_cliente != id)
    }
}