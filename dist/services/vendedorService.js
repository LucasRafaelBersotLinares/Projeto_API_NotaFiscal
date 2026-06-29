"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorService = void 0;
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class VendedorService {
    vendedorRepository = vendedorRepository_1.VendedorRepository.getInstance();
    // notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async insereVendedor(vendedorBody) {
        if (!vendedorBody.nome || !vendedorBody.matricula || vendedorBody.comissao_percentual === undefined) {
            this.erroStatus.insereErro(400);
            throw new Error("Dados obrigatórios faltantes!!! [Nome, Matricula, Comissao_percentual]");
        }
        // if(this.vendedorRepository.matriculaRepetida(vendedorBody.matricula) === -1){
        //     if(vendedorBody.comissao_percentual >= 0 && vendedorBody.comissao_percentual <= 30){
        //         return this.vendedorRepository.insereVendedor(vendedorBody)
        //     }
        //     this.erroStatus.insereErro(400)
        //     throw new Error("A comissão percentual tem que ser um valor entre zero a trinta.")
        // }
        // this.erroStatus.insereErro(409)
        // throw new Error("O sistema já possuí um vendedor cadastrado com está matricula.")
        return this.vendedorRepository.insereVendedor(vendedorBody);
    }
}
exports.VendedorService = VendedorService;
//# sourceMappingURL=vendedorService.js.map