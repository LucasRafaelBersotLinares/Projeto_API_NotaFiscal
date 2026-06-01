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
}
exports.NotaFiscalRepository = NotaFiscalRepository;
//# sourceMappingURL=notaFiscalRepository.js.map