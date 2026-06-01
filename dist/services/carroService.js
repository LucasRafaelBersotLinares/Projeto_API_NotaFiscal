"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroService = void 0;
const carroRepository_1 = require("../repositories/carroRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
class CarroService {
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    notaRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    estoqueRepository = estoqueRepository_1.EstoqueRepository.getInstance();
    insereCarro(carroBody) {
        const anoAtual = new Date();
        if (!carroBody.marca || !carroBody.modelo || !carroBody.ano || !carroBody.placa || !carroBody.preco || !carroBody.cor) {
            throw new Error("Dados obrigatórios faltantes!!! [Marca, Modelo, Ano, Placa, Preco, Cor]");
        }
        if (this.carroRepository.placaRepetida(carroBody.placa) === -1) {
            if (carroBody.ano >= 1950 && carroBody.ano <= (anoAtual.getFullYear() + 1)) {
                if (carroBody.preco > 0) {
                    return this.carroRepository.insereCarro(carroBody);
                }
                throw new Error("O preco do carro deve ser maior que zero");
            }
            throw new Error("O ano do carro deve ser mais que 1950 ou um ano valido antes do proximo ano atual (Ex: 2026 + 1 = 2027)");
        }
        throw new Error("Sistema ja possui um carro cadastrado nesta placa");
    }
    listaCarros() {
        if (this.carroRepository.listaCarros() === undefined) {
            throw new Error("Nenhum Carro cadastrado.");
        }
        return this.carroRepository.listaCarros();
    }
    listaCarroID(id) {
        if (this.carroRepository.listaCarroID(Number(id)) === undefined) {
            throw new Error("Carro com este ID não existe no sistema.");
        }
        return this.carroRepository.listaCarroID(Number(id));
    }
    atualizaCarro(id, carroBody) {
        const anoAtual = new Date();
        if (this.carroRepository.atualizaCarro(Number(id), carroBody) === undefined)
            throw new Error("Carro com este ID não existe no sistema.");
        if (this.carroRepository.placaRepetida(carroBody.placa) != -1)
            throw new Error("Não pode colocar uma placa de uma carro já registrado no sistema. Coloque uma outra placa!");
        if (!(carroBody.ano >= 1950 && carroBody.ano <= (anoAtual.getFullYear() + 1)))
            throw new Error("O ano do carro deve ser maior que 1950 ou um ano válido antes do próximo ano atual. (Ex: 2027 = (anoAtual: 2026) + (próximoAno: 1)= 2027)");
        if (!(carroBody.preco > 0))
            throw new Error("O preço do carro deve ser maior que zero.");
        return this.carroRepository.atualizaCarro(Number(id), carroBody);
    }
    deletaCarro(id) {
        if (this.carroRepository.listaCarroID(Number(id)) === undefined) {
            throw new Error("Carro com este ID não está cadastrado no sistema.");
        }
        if (this.notaRepository.verificaNotaIDtabela(Number(id), "carro") != -1) {
            throw new Error("Carro não pode ser excluído por conta que tem nota emitida.");
        }
        if (this.estoqueRepository.listaEstoqueIDCarro(Number(id)) != undefined) {
            throw new Error("Carro não pode ser excluído por conta que tem estoque aberto.");
        }
        return this.carroRepository.deletaCarro(id);
    }
}
exports.CarroService = CarroService;
//# sourceMappingURL=carroService.js.map