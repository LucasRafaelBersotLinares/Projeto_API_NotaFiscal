"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorRepository = void 0;
const vendedor_1 = require("../models/vendedor");
class VendedorRepository {
    static instance;
    vendedorList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }
    listaVendedores() {
        return this.vendedorList;
    }
    listaVendedorID(id) {
        return this.vendedorList.find(vendedor => vendedor.id_vendedor === id);
    }
    matriculaRepetida(matricula) {
        return this.vendedorList.findIndex(vendedor => vendedor.matricula === matricula);
    }
    insereVendedor(vendedor) {
        const newVendedor = new vendedor_1.Vendedor(vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
        this.vendedorList.push(newVendedor);
        return newVendedor;
    }
    indexVendedor(id) {
        return this.vendedorList.findIndex((vendedor => vendedor.id_vendedor === id));
    }
    atualizaVendedor(id, vendedorBody) {
        let vendedorIndex = this.vendedorList.findIndex((vendedor => vendedor.id_vendedor === id));
        if (vendedorIndex === -1) {
            return undefined;
        }
        this.vendedorList[vendedorIndex].nome = vendedorBody.nome ?? this.vendedorList[vendedorIndex].nome;
        this.vendedorList[vendedorIndex].matricula = vendedorBody.matricula ?? this.vendedorList[vendedorIndex].matricula;
        this.vendedorList[vendedorIndex].comissao_percentual = vendedorBody.comissao_percentual ?? this.vendedorList[vendedorIndex].comissao_percentual;
        return this.vendedorList[vendedorIndex];
    }
}
exports.VendedorRepository = VendedorRepository;
//# sourceMappingURL=vendedorRepository.js.map