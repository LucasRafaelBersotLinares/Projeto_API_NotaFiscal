"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const mysql_1 = require("../database/mysql");
const estoque_1 = require("../models/estoque");
class EstoqueRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    static getCreateTableQuery() {
        return `
            CREATE TABLE IF NOT EXISTS Estoques (
            id_estoque INT AUTO_INCREMENT PRIMARY KEY,
            id_carro INT NOT NULL,
            quantidade INT NOT NULL,
            localizacao_patio VARCHAR(255) NOT NULL,
            data_entrada DATE,
            FOREIGN KEY (id_carro) REFERENCES Carros(id_carro)
            );
        `;
    }
    async insereEstoque(estoque) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO Estoques (id_carro, quantidade, localizacao_patio, data_entrada) VALUES (?, ?, ?, ?)", [estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada]);
        const idGerado = resultado.insertId;
        const newEstoque = new estoque_1.Estoque(idGerado, estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada);
        console.log("Estoque inserido com sucesso:", newEstoque);
        return newEstoque;
    }
    async listaEstoques() {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Estoques", []);
        const estoques = linhas.map((linha) => {
            return new estoque_1.Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, linha.data_entrada);
        });
        return estoques;
    }
    async listaEstoqueID(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Estoques WHERE id_estoque = ?", [id]);
        const estoque = linhas.map((linha) => {
            return new estoque_1.Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, linha.data_entrada);
        });
        return estoque;
    }
    async atualizaEstoque(id, estoqueBody) {
        await (0, mysql_1.executarComandoSQL)(`UPDATE Estoques
            SET 
                quantidade = ?,
                localizacao_patio = ?
            WHERE id_estoque = ?;`, [estoqueBody.quantidade, estoqueBody.localizacao_patio, id]);
        return await (0, mysql_1.executarComandoSQL)("SELECT * FROM Estoques WHERE id_estoque = ?", [id]);
    }
    async carroDuplicado(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Estoques WHERE id_carro = ?", [id]);
        const estoque = linhas.map((linha) => {
            return new estoque_1.Estoque(linha.id_estoque, linha.id_carro, linha.quantidade, linha.localizacao_patio, linha.data_entrada);
        });
        return estoque;
    }
    async deleteEstoque(id) {
        const estoque = await this.listaEstoqueID(id);
        await (0, mysql_1.executarComandoSQL)("DELETE FROM Estoques WHERE id_estoque = ?", [id]);
        return estoque;
    }
}
exports.EstoqueRepository = EstoqueRepository;
//# sourceMappingURL=estoqueRepository.js.map