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
            if (vendedorBody.comissao_percentual >= 0 && vendedorBody.comissao_percentual <= 30) {
                return this.vendedorRepository.insereVendedor(vendedorBody);
            }
            throw new Error("A comissão percentual tem que ser um valor entre 0 a 30");
        }
        throw new Error("Sistema ja possui um vendedor cadastrado nesta matricula");
    }
    listaVendedores() {
        if (this.vendedorRepository.listaVendedores() === undefined) {
            throw new Error("Nenhum Vendedor cadastrado.");
        }
        return this.vendedorRepository.listaVendedores();
    }
    listaVendedorID(id) {
        if (this.vendedorRepository.listaVendedorID(Number(id)) === undefined) {
            throw new Error("Vendedor com este ID não existe no sistema.");
        }
        return this.vendedorRepository.listaVendedorID(Number(id));
    }
}
exports.VendedorService = VendedorService;
//# sourceMappingURL=vendedorService.js.map