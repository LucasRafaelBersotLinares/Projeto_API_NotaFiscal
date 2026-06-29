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
            CREATE TABLE IF NOT EXISTS Clientes (
            id_cliente INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(255) NOT NULL,
            telefone VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            cidade VARCHAR(255)
            );
        `;
    }

    async insereCliente(cliente: Cliente): Promise<Cliente> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Clientes (nome, cpf, telefone, email, cidade) VALUES (?, ?, ?, ?, ?)",
            [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade]
        );

        const idGerado = resultado.insertId;

        const newCliente = new Cliente(
            idGerado,
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email,
            cliente.cidade
        );

        console.log("Cliente inserido com sucesso:", newCliente);
        return newCliente;
    }

    async listaClientes(): Promise<Cliente[]> {
        const linhas = await executarComandoSQL("SELECT * FROM Clientes", []);
        const clientes: Cliente[] = linhas.map((linha: any) => {
            return new Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade)
        })
        return clientes
    }

    async listaClienteID(id: any): Promise<Cliente | undefined>{
        const linhas = await executarComandoSQL("SELECT * FROM Clientes WHERE id_cliente = ?", [id])
        const cliente: Cliente = linhas.map((linha: any) => {
            return new Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade)
        })
        return cliente
    }

    async atualizaCliente(id: any, clienteBody: any): Promise<Cliente> {
        await executarComandoSQL(
            `UPDATE Clientes
            SET 
                nome = ?,
                telefone = ?,
                cpf = ?,
                email = ?,
                cidade = ?
            WHERE id_cliente = ?;`,
            [clienteBody.nome, clienteBody.telefone, clienteBody.cpf, clienteBody.email, clienteBody.cidade,id]
        );
        return await executarComandoSQL("SELECT * FROM Clientes WHERE id_cliente = ?", [id])
    }

    async deleteCliente(id: any): Promise<Cliente | undefined> {
        const cliente = await this.listaClienteID(id)
        await executarComandoSQL("DELETE FROM Clientes WHERE id_cliente = ?", [id])
        return cliente
    }
}