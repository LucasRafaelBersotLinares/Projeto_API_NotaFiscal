"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorRepository = void 0;
const mysql_1 = require("../database/mysql");
const vendedor_1 = require("../models/vendedor");
class VendedorRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }
    static getCreateTableQuery() {
        return `
            CREATE TABLE IF NOT EXISTS Vendedores (
            id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            matricula VARCHAR(255) NOT NULL,
            comissao_percentual INT NOT NULL
            );
        `;
    }
    async insereVendedor(vendedor) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO Vendedores (nome, matricula, comissao_percentual) VALUES (?, ?, ?)", [vendedor.nome, vendedor.matricula, vendedor.comissao_percentual]);
        const idGerado = resultado.insertId;
        const newCliente = new vendedor_1.Vendedor(idGerado, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
        console.log("Cliente inserido com sucesso:", newCliente);
        return newCliente;
    }
}
exports.VendedorRepository = VendedorRepository;
//# sourceMappingURL=vendedorRepository.js.map