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
}