"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscalRepository = void 0;
const notaFiscal_1 = require("../models/notaFiscal");
class NotaFiscalRepository {
    static instance;
    notaList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }
    emiteNota(nota) {
        const newNota = new notaFiscal_1.NotaFiscal(nota.numero_nota, nota.data_emissao, nota.valor_total, nota.id_cliente, nota.id_vendedor, nota.id_carro);
        this.notaList.push(newNota);
        return newNota;
    }
    notaDuplicada(numero) {
        return this.notaList.findIndex(nota => nota.numero_nota === numero);
    }
    listaNotas() {
        return this.notaList;
    }
    listaNotaID(id) {
        return this.notaList.find(nota => nota.id_nota === id);
    }
    verificaNotaIDtabela(id, tabela) {
        switch (tabela) {
            case "cliente":
                return this.notaList.findIndex(nota => nota.id_cliente === id);
                break;
            case "vendedor":
                return this.notaList.findIndex(nota => nota.id_vendedor === id);
                break;
            default:
                return -1;
        }
    }
    listaNotasporTabela(id, tabela) {
        switch (tabela) {
            case "cliente":
                return this.notaList.filter(nota => nota.id_cliente == id);
            case "vendedor":
                return this.notaList.filter(nota => nota.id_vendedor == id);
            default:
                return undefined;
        }
    }
}
exports.NotaFiscalRepository = NotaFiscalRepository;
//# sourceMappingURL=notaFiscalRepository.js.map