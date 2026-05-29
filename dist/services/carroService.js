"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroService = void 0;
const carroRepository_1 = require("../repositories/carroRepository");
class CarroService {
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    insereCarro(carroBody) {
        const anoAtual = new Date();
        if (!carroBody.marca || !carroBody.modelo || !carroBody.ano || !carroBody.placa || !carroBody.preco || !carroBody.cor) {
            throw new Error("Dados obrigatórios faltantes!!!\n[Marca, Modelo, Ano, Placa, Preco, Cor]");
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
}
exports.CarroService = CarroService;
//# sourceMappingURL=carroService.js.map