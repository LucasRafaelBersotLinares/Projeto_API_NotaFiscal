"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscal = void 0;
class NotaFiscal {
    id_nota;
    numero_nota;
    data_emissao;
    valor_total;
    id_cliente;
    id_vendedor;
    id_carro;
    constructor(id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro) {
        this.id_nota = id_nota;
        this.numero_nota = numero_nota;
        this.data_emissao = data_emissao;
        this.valor_total = valor_total;
        this.id_cliente = id_cliente;
        this.id_vendedor = id_vendedor;
        this.id_carro = id_carro;
    }
}
exports.NotaFiscal = NotaFiscal;
//# sourceMappingURL=notaFiscal.js.map