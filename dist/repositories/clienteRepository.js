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
            id INT AUTO_INCREMENT PRIMARY KEY,
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
}
exports.ClienteRepository = ClienteRepository;
//# sourceMappingURL=clienteRepository.js.map