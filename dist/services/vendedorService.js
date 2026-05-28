"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorService = void 0;
const vendedorRepository_1 = require("../repositories/vendedorRepository");
class VendedorService {
    vendedorRepository = vendedorRepository_1.VendedorRepository.getInstance();
    insereVendedor(vendedorBody) {
        if (!vendedorBody.nome || !vendedorBody.matricula || !vendedorBody.comissao_percentual) {
            throw new Error("Dados obrigatórios faltantes!!! [Nome, Matricula, Comissao_percentual]");
        }
        if (this.vendedorRepository.matriculaRepetida(vendedorBody.matricula) === -1) {
            return this.vendedorRepository.insereVendedor(vendedorBody);
        }
        throw new Error("Sistema ja possui um vendedor cadastrado nesta matricula");
    }
}
exports.VendedorService = VendedorService;
//# sourceMappingURL=vendedorService.js.map