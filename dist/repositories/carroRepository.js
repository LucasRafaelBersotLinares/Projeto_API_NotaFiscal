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
    atualizaCarro(id, carroBody) {
        let carroIndex = this.carroList.findIndex((carro => carro.id_carro === id));
        if (carroIndex === -1) {
            return undefined;
        }
        this.carroList[carroIndex].marca = carroBody.marca ?? this.carroList[carroIndex].marca;
        this.carroList[carroIndex].modelo = carroBody.modelo ?? this.carroList[carroIndex].modelo;
        this.carroList[carroIndex].ano = carroBody.ano ?? this.carroList[carroIndex].ano;
        this.carroList[carroIndex].placa = carroBody.placa ?? this.carroList[carroIndex].placa;
        this.carroList[carroIndex].preco = carroBody.preco ?? this.carroList[carroIndex].preco;
        this.carroList[carroIndex].cor = carroBody.cor ?? this.carroList[carroIndex].cor;
        return this.carroList[carroIndex];
    }
}
exports.CarroRepository = CarroRepository;
//# sourceMappingURL=carroRepository.js.map