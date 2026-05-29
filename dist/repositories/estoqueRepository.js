"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const estoque_1 = require("../models/estoque");
class EstoqueRepository {
    static instance;
    estoqueList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    insereEstoque(estoque) {
        const newEstoque = new estoque_1.Estoque(estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada);
        this.estoqueList.push(newEstoque);
        return newEstoque;
    }
    idCarroDuplicado(id) {
        return this.estoqueList.findIndex(estoque => estoque.id_carro === id);
    }
    listaEstoque() {
        return this.estoqueList;
    }
}
exports.EstoqueRepository = EstoqueRepository;
//# sourceMappingURL=estoqueRepository.js.map