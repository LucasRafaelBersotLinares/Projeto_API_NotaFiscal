import { executarComandoSQL } from "../database/mysql"
import { Cliente } from "../models/cliente"

export class ClienteRepository {
    private static instance: ClienteRepository
    private constructor() {}

    public static getInstance(): ClienteRepository {
        if(!this.instance){
            this.instance = new ClienteRepository()
        }
        return this.instance
    }

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS Cliente (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(255) NOT NULL,
            telefone VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            cidade VARCHAR(255)
            );
        `;
    }
}