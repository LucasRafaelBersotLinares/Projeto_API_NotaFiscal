"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereCarro = insereCarro;
exports.listaCarros = listaCarros;
const carroService_1 = require("../services/carroService");
const carroService = new carroService_1.CarroService();
function insereCarro(req, res) {
    try {
        const newCarro = carroService.insereCarro(req.body);
        res.status(201).json({
            message: "Carro cadastrado com sucesso!!!",
            carro: newCarro
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function listaCarros(req, res) {
    try {
        const carroList = carroService.listaCarros();
        res.status(200).json({
            carroList
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//# sourceMappingURL=carroController.js.map