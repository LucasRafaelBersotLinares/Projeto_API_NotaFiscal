"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    id_estoque;
    id_carro;
    quantidade;
    localizacao_patio;
    data_entrada;
    constructor(id_carro, quantidade, localizacao_patio, data_entrada) {
        this.id_estoque = this.geraId();
        this.id_carro = id_carro;
        this.quantidade = quantidade;
        this.localizacao_patio = localizacao_patio;
        this.data_entrada = data_entrada;
    }
    geraId() {
        return Date.now();
    }
}
exports.Estoque = Estoque;
//# sourceMappingURL=estoque.js.map