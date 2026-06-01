"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorService = void 0;
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
class VendedorService {
    vendedorRepository = vendedorRepository_1.VendedorRepository.getInstance();
    notaRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
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
    atualizaVendedor(id, vendedorBody) {
        if (this.vendedorRepository.atualizaVendedor(Number(id), vendedorBody) === undefined) {
            throw new Error("Vendedor com este ID não existe no sistema.");
        }
        return this.vendedorRepository.atualizaVendedor(Number(id), vendedorBody);
    }
    deletaVendedor(id) {
        if (this.vendedorRepository.listaVendedorID(Number(id)) === undefined) {
            throw new Error("Vendedor com este ID não está cadastrado no sistema.");
        }
        if (this.notaRepository.verificaNotaIDtabela(Number(id), "vendedor") != -1) {
            throw new Error("Vendedor não pode ser excluído por conta que tem nota emitida.");
        }
        return this.vendedorRepository.deletaVendedor(id);
    }
}
exports.VendedorService = VendedorService;
//# sourceMappingURL=vendedorService.js.map