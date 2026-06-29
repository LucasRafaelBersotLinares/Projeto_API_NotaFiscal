"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscalRepository = void 0;
const mysql_1 = require("../database/mysql");
const notaFiscal_1 = require("../models/notaFiscal");
class NotaFiscalRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }
    static getCreateTableQuery() {
        return `
            CREATE TABLE IF NOT EXISTS Notas (
            id_nota INT AUTO_INCREMENT PRIMARY KEY,
            numero_nota VARCHAR(255) NOT NULL,
            data_emissao DATE NOT NULL,
            valor_total INT NOT NULL,
            id_cliente INT NOT NULL,
            id_vendedor INT NOT NULL,
            id_carro INT NOT NULL,

            FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
            FOREIGN KEY (id_vendedor) REFERENCES Vendedores(id_vendedor),
            FOREIGN KEY (id_carro) REFERENCES Carros(id_carro)
            );
        `;
    }
    async emiteNota(nota) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO Notas (numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro) VALUES (?, ?, ?, ?, ?, ?)", [nota.numero_nota, nota.data_emissao, nota.valor_total, nota.id_cliente, nota.id_vendedor, nota.id_carro]);
        const idGerado = resultado.insertId;
        const newNota = new notaFiscal_1.NotaFiscal(idGerado, nota.numero_nota, nota.data_emissao, nota.valor_total, nota.id_cliente, nota.id_vendedor, nota.id_carro);
        console.log("Nota emitida com sucesso:", newNota);
        return newNota;
    }
    async listaNotas() {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas", []);
        const notas = linhas.map((linha) => {
            return new notaFiscal_1.NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
        });
        return notas;
    }
    async notaDuplicada(nota) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas WHERE numero_nota = ?", [nota]);
        if (linhas.length === 0) {
            return undefined;
        }
        const linha = linhas[0];
        return new notaFiscal_1.NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
    }
    async listaNotaID(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas WHERE id_nota = ?", [id]);
        if (linhas.length === 0) {
            return undefined;
        }
        const linha = linhas[0];
        return new notaFiscal_1.NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
    }
    async verificaCliente(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas WHERE id_cliente = ?", [id]);
        if (linhas.length === 0) {
            return undefined;
        }
        else {
            return 1;
        }
    }
    async verificaVendedor(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas WHERE id_vendedor = ?", [id]);
        if (linhas.length === 0) {
            return undefined;
        }
        else {
            return 1;
        }
    }
    async verificaCarro(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas WHERE id_carro = ?", [id]);
        if (linhas.length === 0) {
            return undefined;
        }
        else {
            return 1;
        }
    }
    async listaNotasCliente(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas WHERE id_cliente = ?", [id]);
        const notas = linhas.map((linha) => {
            return new notaFiscal_1.NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
        });
        return notas;
    }
    async listaNotasVendedor(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas WHERE id_vendedor = ?", [id]);
        const notas = linhas.map((linha) => {
            return new notaFiscal_1.NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
        });
        return notas;
    }
    async listaNotasCarro(id) {
        const linhas = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Notas WHERE id_carro = ?", [id]);
        const notas = linhas.map((linha) => {
            return new notaFiscal_1.NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro);
        });
        return notas;
    }
}
exports.NotaFiscalRepository = NotaFiscalRepository;
//# sourceMappingURL=notaFiscalRepository.js.map