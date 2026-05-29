"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroService = void 0;
const carroRepository_1 = require("../repositories/carroRepository");
class CarroService {
    carroRepository = carroRepository_1.CarroRepository.getInstance();
    insereCarro(carroBody) {
        if (!carroBody.marca || !carroBody.modelo || !carroBody.ano || !carroBody.placa || !carroBody.preco || !carroBody.cor) {
            throw new Error("Dados obrigatórios faltantes!!!\n[Marca, Modelo, Ano, Placa, Preco, Cor]");
        }
        if (this.carroRepository.placaRepetida(carroBody.placa) === -1) {
            return this.carroRepository.insereCarro(carroBody);
        }
        throw new Error("Sistema ja possui um carro cadastrado nesta placa");
    }
}
exports.CarroService = CarroService;
//# sourceMappingURL=carroService.js.map