"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroRepository = void 0;
const carro_1 = require("../models/carro");
class CarroRepository {
    static instance;
    carroList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CarroRepository();
        }
        return this.instance;
    }
    listaCarros() {
        return this.carroList;
    }
    listaCarroID(id) {
        return this.carroList.find(carro => carro.id_carro === id);
    }
    placaRepetida(placa) {
        return this.carroList.findIndex(carro => carro.placa === placa);
    }
    insereCarro(carro) {
        const newCarro = new carro_1.Carro(carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);
        this.carroList.push(newCarro);
        return newCarro;
    }
}
exports.CarroRepository = CarroRepository;
//# sourceMappingURL=carroRepository.js.map