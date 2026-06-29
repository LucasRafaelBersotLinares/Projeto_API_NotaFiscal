"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorService = void 0;
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class VendedorService {
    vendedorRepository = vendedorRepository_1.VendedorRepository.getInstance();
    notaRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    insereVendedor(vendedorBody) {
        if (!vendedorBody.nome || !vendedorBody.matricula || vendedorBody.comissao_percentual === undefined) {
            this.erroStatus.insereErro(400);
            throw new Error("Dados obrigatórios faltantes!!! [Nome, Matricula, Comissao_percentual]");
        }
        if (this.vendedorRepository.matriculaRepetida(vendedorBody.matricula) === -1) {
            if (vendedorBody.comissao_percentual >= 0 && vendedorBody.comissao_percentual <= 30) {
                return this.vendedorRepository.insereVendedor(vendedorBody);
            }
            this.erroStatus.insereErro(400);
            throw new Error("A comissão percentual tem que ser um valor entre zero a trinta.");
        }
        this.erroStatus.insereErro(409);
        throw new Error("O sistema já possuí um vendedor cadastrado com está matricula.");
    }
    listaVendedores() {
        if (this.vendedorRepository.listaVendedores() === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Nenhum Vendedor cadastrado.");
        }
        return this.vendedorRepository.listaVendedores();
    }
    listaVendedorID(id) {
        if (this.vendedorRepository.listaVendedorID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Vendedor cadastrado com este ID, não existe no sistema.");
        }
        return this.vendedorRepository.listaVendedorID(Number(id));
    }
    atualizaVendedor(id, vendedorBody) {
        if (this.vendedorRepository.indexVendedor(Number(id)) === -1) {
            this.erroStatus.insereErro(404);
            throw new Error("Vendedor cadastrado com este ID, não existe no sistema.");
        }
        const indexId = this.vendedorRepository.indexVendedor(Number(id));
        const indexMatricula = this.vendedorRepository.matriculaRepetida(vendedorBody.matricula);
        if (indexMatricula !== -1 && indexMatricula !== indexId) {
            this.erroStatus.insereErro(409);
            throw new Error("Não pode ter um vendedor com uma matrícula já cadastrada. Atualize com outra matrícula.");
        }
        if (!(vendedorBody.comissao_percentual >= 0 && vendedorBody.comissao_percentual <= 30)) {
            this.erroStatus.insereErro(400);
            throw new Error("A comissão percentual tem que ser um valor entre 0 a 30.");
        }
        return this.vendedorRepository.atualizaVendedor(Number(id), vendedorBody);
    }
    deletaVendedor(id) {
        if (this.vendedorRepository.listaVendedorID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Vendedor cadastrado com este ID, não existe no sistema.");
        }
        if (this.notaRepository.verificaNotaIDtabela(Number(id), "vendedor") != -1) {
            this.erroStatus.insereErro(422);
            throw new Error("Vendedor não pode ser excluído por conta que tem nota emitida.");
        }
        return this.vendedorRepository.deletaVendedor(id);
    }
    listaNotasVendedor(id) {
        if (this.notaRepository.listaNotasporTabela(id, "vendedor").length === 0) {
            this.erroStatus.insereErro(404);
            throw new Error("Vendedor não possuí notas emitidas no sistema.");
        }
        return this.notaRepository.listaNotasporTabela(id, "vendedor");
    }
}
exports.VendedorService = VendedorService;
//# sourceMappingURL=vendedorService.js.map