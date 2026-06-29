"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const carroRepository_1 = require("../repositories/carroRepository");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class EstoqueService {
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async insereEstoque(estoqueBody) {
        const dataAtual = new Date().toISOString();
        const dataEntrada = new Date(estoqueBody.data_entrada);
        if (isNaN(dataEntrada.getTime())) {
            this.erroStatus.insereErro(400);
            throw new Error("Formato de data inválido use [yyyy-mm-dd]");
        }
        if (!estoqueBody.id_carro || estoqueBody.quantidade === undefined || !estoqueBody.localizacao_patio || !estoqueBody.data_entrada) {
            this.erroStatus.insereErro(400);
            throw new Error("Dados obrigatórios faltantes!!! [ID_carro, Quantidade, Localizacao_patio, Data_entrada].");
        }
        if (await this.carroRepository.listaCarroID(estoqueBody.id_carro) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("ID carro não consta no sistema, cadastre o veiculo antes de criar seu estoque.");
        }
        if (dataEntrada.toISOString() > dataAtual) {
            this.erroStatus.insereErro(400);
            throw new Error("A data de entrada não pode ser uma data futura, coloque a data real que o carro entrou.");
        }
        if (estoqueBody.quantidade >= 0) {
            if (await this.estoqueRepository.carroDuplicado(estoqueBody.id_carro) === undefined) {
                return this.estoqueRepository.insereEstoque(estoqueBody);
            }
            this.erroStatus.insereErro(409);
            throw new Error("Carro já possuí um estoque ativo com esse ID.");
        }
        this.erroStatus.insereErro(400);
        throw new Error("o campo quantidade deve ser maior ou igual a zero, números negativos não são aceitos.");
    }
    async listaEstoque() {
        if (await this.estoqueRepository.listaEstoques() === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Nenhum Estoque cadastrado.");
        }
        return this.estoqueRepository.listaEstoques();
    }
    async listaEstoqueID(id) {
        if (await this.estoqueRepository.listaEstoqueID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Estoque com este ID, não existe no sistema.");
        }
        return this.estoqueRepository.listaEstoqueID(Number(id));
    }
    async listaEstoqueCarroID(id) {
        if (await this.estoqueRepository.listaEstoqueCarroID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Estoque com este ID de carro, não existe no sistema.");
        }
        return await this.estoqueRepository.listaEstoqueCarroID(Number(id));
    }
    async atualizaEstoque(id, estoqueBody) {
        if (await this.estoqueRepository.listaEstoqueID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Estoque com este ID, não existe no sistema.");
        }
        if (!(estoqueBody.quantidade >= 0)) {
            this.erroStatus.insereErro(400);
            throw new Error("O campo quantidade de carro no estoque, deve ser maior ou igual a zero.");
        }
        return this.estoqueRepository.atualizaEstoque(Number(id), estoqueBody);
    }
    async deletaEstoque(id) {
        if (await this.estoqueRepository.listaEstoqueID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Estoque com este ID, não existe no sistema.");
        }
        return await this.estoqueRepository.deleteEstoque(Number(id));
    }
}
exports.EstoqueService = EstoqueService;
//# sourceMappingURL=estoqueService.js.map