"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendedor = void 0;
class Vendedor {
    id_vendedor;
    nome;
    matricula;
    comissao_percentual;
    constructor(id_vendedor, nome, matricula, comissao_percentual) {
        this.id_vendedor = this.geraId();
        this.nome = nome;
        this.matricula = matricula;
        this.comissao_percentual = comissao_percentual;
    }
    geraId() {
        return Date.now();
    }
}
exports.Vendedor = Vendedor;
//# sourceMappingURL=vendedor.js.map