"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscalService = void 0;
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const carroRepository_1 = require("../repositories/carroRepository");
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const clienteRepository_1 = require("../repositories/clienteRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class NotaFiscalService {
    notaRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    vendedorRepository = vendedorRepository_1.VendedorRepository.getInstance();
    clienteRepository = clienteRepository_1.ClienteRepository.getInstance();
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async emiteNota(notaBody) {
        const dataAtual = new Date().toISOString();
        const dataEntrada = new Date(notaBody.data_emissao);
        if (isNaN(dataEntrada.getTime())) {
            this.erroStatus.insereErro(400);
            throw new Error("Formato de data inválido use [yyyy-mm-dd]");
        }
        if (!notaBody.numero_nota || !notaBody.data_emissao || !notaBody.valor_total || !notaBody.id_cliente || !notaBody.id_vendedor || !notaBody.id_carro) {
            this.erroStatus.insereErro(400);
            throw new Error("Dados obrigatórios faltantes!!! [Numero da nota, Data emissao, Valor total, ID Cliente, ID Vendedor, ID Carro].");
        }
        if (!(notaBody.valor_total > 0)) {
            this.erroStatus.insereErro(400);
            throw new Error("O campo valor total, deve ser maior que zero.");
        }
        if (dataEntrada.toISOString() > dataAtual) {
            this.erroStatus.insereErro(400);
            throw new Error("A data de emissão não pode ser uma data futura, coloque a data real que a nota foi emitida.");
        }
        const estoqueCarro = await this.estoqueRepository.listaEstoqueCarroID(notaBody.id_carro);
        if (estoqueCarro === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("O Carro deve estar cadastrado no estoque.");
        }
        if (estoqueCarro.quantidade > 0) {
            estoqueCarro.quantidade -= 1;
            await this.estoqueRepository.diminuirEstoque(estoqueCarro.id_estoque, estoqueCarro);
            if (this.notaRepository.notaDuplicada(notaBody.numero_nota) === undefined) {
                return this.notaRepository.emiteNota(notaBody);
            }
            this.erroStatus.insereErro(409);
            throw new Error("Esse número de nota está vinculada a uma existente. ");
        }
        this.erroStatus.insereErro(422);
        throw new Error("A quantidade do carro que está no estoque é igual a 0, não pode vender esse carro.");
    }
    async listaNotas() {
        if (await this.notaRepository.listaNotas() === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Nenhuma Nota emitida.");
        }
        return this.notaRepository.listaNotas();
    }
    async listaNotaID(id) {
        if (await this.notaRepository.listaNotaID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Não existe nota emitida com este ID.");
        }
        return this.notaRepository.listaNotaID(Number(id));
    }
}
exports.NotaFiscalService = NotaFiscalService;
//# sourceMappingURL=notaFiscalService.js.map