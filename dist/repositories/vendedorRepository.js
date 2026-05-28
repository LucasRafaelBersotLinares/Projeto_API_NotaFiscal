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
    insereVendedor(vendedor) {
        const newVendedor = new vendedor_1.Vendedor(vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
        this.vendedorList.push(newVendedor);
        return newVendedor;
    }
    matriculaRepetida(matricula) {
        return this.vendedorList.findIndex(vendedor => vendedor.matricula === matricula);
    }
}
exports.VendedorRepository = VendedorRepository;
//# sourceMappingURL=vendedorRepository.js.map