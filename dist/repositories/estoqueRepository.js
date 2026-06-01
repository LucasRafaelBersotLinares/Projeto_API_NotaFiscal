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
    indexEstoque(id) {
        return this.estoqueList.findIndex(estoque => estoque.id_estoque === id);
    }
    idCarroDuplicado(id) {
        return this.estoqueList.findIndex(estoque => estoque.id_carro === id);
    }
    listaEstoque() {
        return this.estoqueList;
    }
    listaEstoqueID(id) {
        return this.estoqueList.find(estoque => estoque.id_estoque === id);
    }
    listaEstoqueIDCarro(id_carro) {
        return this.estoqueList.find(estoque => estoque.id_carro === id_carro);
    }
    atualizaEstoque(id, estoqueBody) {
        let estoqueIndex = this.indexEstoque(Number(id));
        this.estoqueList[estoqueIndex].quantidade = estoqueBody.quantidade ?? this.estoqueList[estoqueIndex].quantidade;
        this.estoqueList[estoqueIndex].localizacao_patio = estoqueBody.localizacao_patio ?? this.estoqueList[estoqueIndex].localizacao_patio;
        return this.estoqueList[estoqueIndex];
    }
    deletaEstoque(id) {
        this.estoqueList = this.estoqueList.filter(estoque => estoque.id_estoque != id);
        return this.estoqueList;
    }
    diminuirEstoque(id) {
        let estoqueIndex = this.estoqueList.findIndex(estoque => estoque.id_estoque === id);
        this.estoqueList[estoqueIndex].quantidade -= 1;
    }
}
exports.EstoqueRepository = EstoqueRepository;
//# sourceMappingURL=estoqueRepository.js.map