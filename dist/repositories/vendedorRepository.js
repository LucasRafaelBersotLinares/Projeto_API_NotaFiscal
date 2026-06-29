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
    async matriculaRepetida(matricula) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Vendedores WHERE matricula = ?", [matricula]);
        if (linhas.length === 0) {
            return undefined;
        }
        const linha = linhas[0];
        return new vendedor_1.Vendedor(linha.id_vendedor, linha.nome, linha.matricula, linha.comissao_percentual);
    }
    async insereVendedor(vendedor) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO Vendedores (nome, matricula, comissao_percentual) VALUES (?, ?, ?)", [vendedor.nome, vendedor.matricula, vendedor.comissao_percentual]);
        const idGerado = resultado.insertId;
        const newCliente = new vendedor_1.Vendedor(idGerado, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
        console.log("Cliente inserido com sucesso:", newCliente);
        return newCliente;
    }
    // matriculaRepetida(matricula: string): number{
    //     return this.vendedorList.findIndex(vendedor => vendedor.matricula === matricula)
    // }
    // indexVendedor(id: any){
    //     return this.vendedorList.findIndex((vendedor => vendedor.id_vendedor === id))
    // }
    async listaVendedores() {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Vendedores", []);
        const vendedores = linhas.map((linha) => {
            return new vendedor_1.Vendedor(linha.id_vendedor, linha.nome, linha.matricula, linha.comissao_percentual);
        });
        return vendedores;
    }
    async listaVendedorID(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Vendedores WHERE id_vendedor = ?", [id]);
        const vendedor = linhas.map((linha) => {
            return new vendedor_1.Vendedor(linha.id_vendedor, linha.nome, linha.matricula, linha.comissao_percentual);
        });
        return vendedor;
    }
    async atualizaVendedor(id, vendedorBody) {
        await (0, mysql_1.executarComandoSQL)(`UPDATE Vendedores
            SET 
                nome = ?,
                matricula = ?,
                comissao_percentual = ?
            WHERE id_vendedor = ?;`, [vendedorBody.nome, vendedorBody.matricula, vendedorBody.comissao_percentual, id]);
        return await (0, mysql_1.executarComandoSQL)("SELECT * FROM Vendedores WHERE id_vendedor = ?", [id]);
    }
    async deleteVendedor(id) {
        const vendedor = await this.listaVendedorID(id);
        await (0, mysql_1.executarComandoSQL)("DELETE FROM Vendedores WHERE id_vendedor = ?", [id]);
        return vendedor;
    }
}
exports.VendedorRepository = VendedorRepository;
//# sourceMappingURL=vendedorRepository.js.map