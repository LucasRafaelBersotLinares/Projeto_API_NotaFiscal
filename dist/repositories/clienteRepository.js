"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const mysql_1 = require("../database/mysql");
const cliente_1 = require("../models/cliente");
class ClienteRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ClienteRepository();
        }
        return this.instance;
    }
    static getCreateTableQuery() {
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
    async insereCliente(cliente) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO Clientes (nome, cpf, telefone, email, cidade) VALUES (?, ?, ?, ?, ?)", [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade]);
        const idGerado = resultado.insertId;
        const newCliente = new cliente_1.Cliente(idGerado, cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade);
        console.log("Cliente inserido com sucesso:", newCliente);
        return newCliente;
    }
    async listaClientes() {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Clientes", []);
        const clientes = linhas.map((linha) => {
            return new cliente_1.Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
        });
        return clientes;
    }
    async listaClienteID(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Clientes WHERE id_cliente = ?", [id]);
        const cliente = linhas.map((linha) => {
            return new cliente_1.Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
        });
        return cliente;
    }
    async atualizaCliente(id, clienteBody) {
        await (0, mysql_1.executarComandoSQL)(`UPDATE Clientes
            SET 
                nome = ?,
                telefone = ?,
                cpf = ?,
                email = ?,
                cidade = ?
            WHERE id_cliente = ?;`, [clienteBody.nome, clienteBody.telefone, clienteBody.cpf, clienteBody.email, clienteBody.cidade, id]);
        return await (0, mysql_1.executarComandoSQL)("SELECT * FROM Clientes WHERE id_cliente = ?", [id]);
    }
    async deleteCliente(id) {
        const cliente = await this.listaClienteID(id);
        await (0, mysql_1.executarComandoSQL)("DELETE FROM Clientes WHERE id_cliente = ?", [id]);
        return cliente;
    }
}
exports.ClienteRepository = ClienteRepository;
//# sourceMappingURL=clienteRepository.js.map