"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroRepository = void 0;
const mysql_1 = require("../database/mysql");
const carro_1 = require("../models/carro");
class CarroRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CarroRepository();
        }
        return this.instance;
    }
    static getCreateTableQuery() {
        return `
            CREATE TABLE IF NOT EXISTS Carros (
            id_carro INT AUTO_INCREMENT PRIMARY KEY,
            marca VARCHAR(255) NOT NULL,
            modelo VARCHAR(255) NOT NULL,
            ano INT (255) NOT NULL,
            placa VARCHAR(255) NOT NULL,
            preco INT (255) NOT NULL,
            cor VARCHAR(255) NOT NULL
            );
        `;
    }
    async insereCarro(carro) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO Carros (marca, modelo, ano, placa, preco, cor) VALUES (?, ?, ?, ?, ?, ?)", [carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor]);
        const idGerado = resultado.insertId;
        const newCarro = new carro_1.Carro(idGerado, carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);
        console.log("Carro inserido com sucesso:", newCarro);
        return newCarro;
    }
    async listaCarros() {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Carros", []);
        const carros = linhas.map((linha) => {
            return new carro_1.Carro(linha.id_carro, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor);
        });
        return carros;
    }
    async listaCarroID(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Carros WHERE id_carro = ?", [id]);
        const carro = linhas.map((linha) => {
            return new carro_1.Carro(linha.id_carro, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor);
        });
        return carro;
    }
    async atualizaCarro(id, carroBody) {
        await (0, mysql_1.executarComandoSQL)(`UPDATE Carros
            SET 
                marca = ?,
                modelo = ?,
                ano = ?,
                placa = ?,
                preco = ?,
                cor = ?
            WHERE id_carro = ?;`, [carroBody.marca, carroBody.modelo, carroBody.ano, carroBody.placa, carroBody.preco, carroBody.cor, id]);
        return await (0, mysql_1.executarComandoSQL)("SELECT * FROM Carros WHERE id_carro = ?", [id]);
    }
    async deleteCarro(id) {
        const carro = await this.listaCarroID(id);
        await (0, mysql_1.executarComandoSQL)("DELETE FROM Carros WHERE id_carro = ?", [id]);
        return carro;
    }
}
exports.CarroRepository = CarroRepository;
//# sourceMappingURL=carroRepository.js.map