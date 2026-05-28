import { Cliente } from "../models/cliente"

export class clienteRepository {
    private static instance: clienteRepository
    private clienteList: Cliente[] = []
    private constructor() {}

    public static getInstance(): clienteRepository {
        if(!this.instance){
            this.instance = new clienteRepository()
        }
        return this.instance
    }
}