"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const carroRepository_1 = require("../repositories/carroRepository");
class EstoqueService {
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    insereEstoque(estoqueBody) {
        const dataAtual = new Date();
        const dataEntrada = new Date(estoqueBody.data_entrada);
        if (!estoqueBody.id_carro || estoqueBody.quantidade === undefined || !estoqueBody.localizacao_patio || !estoqueBody.data_entrada) {
            throw new Error("Dados obrigatórios faltantes!!! [ID_carro, Quantidade, Localizacao_patio, Data_entrada]");
        }
        if (this.carroRepository.listaCarroID(estoqueBody.id_carro) === undefined) {
            throw new Error("ID_carro nao consta no sistema, cadastre o veiculo antes de cria-lo no estoque.");
        }
        if (dataEntrada > dataAtual) {
            throw new Error("A data de entrada nao pode ser uma data futura, coloque a data real que o carro entrou.");
        }
        if (estoqueBody.quantidade >= 0) {
            if (this.estoqueRepository.idCarroDuplicado(estoqueBody.id_carro) === -1) {
                return this.estoqueRepository.insereEstoque(estoqueBody);
            }
            throw new Error("Carro ja possui um estoque tivo com esse ID");
        }
        throw new Error("Quantidade deve ser maior ou igual a 0, numeros negativos nao sao aceitos.");
    }
}
exports.EstoqueService = EstoqueService;
//# sourceMappingURL=estoqueService.js.map