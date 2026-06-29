"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereCarro = insereCarro;
exports.listaCarros = listaCarros;
exports.listaCarroID = listaCarroID;
exports.listaCarroDisponiveis = listaCarroDisponiveis;
exports.atualizaCarro = atualizaCarro;
exports.deletaCarro = deletaCarro;
const carroService_1 = require("../services/carroService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
const carroService = new carroService_1.CarroService();
const erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
function insereCarro(req, res) {
    try {
        const newCarro = carroService.insereCarro(req.body);
        res.status(201).json(newCarro);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaCarros(req, res) {
    try {
        const carroList = carroService.listaCarros();
        res.status(200).json(carroList);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaCarroID(req, res) {
    try {
        const carroID = carroService.listaCarroID(req.params.id);
        res.status(200).json(carroID);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaCarroDisponiveis(req, res) {
    try {
        const carrosDisponiveis = carroService.listaCarroDisponivel();
        res.status(200).json(carrosDisponiveis);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function atualizaCarro(req, res) {
    try {
        const carroAtualizado = carroService.atualizaCarro(req.params.id, req.body);
        res.status(200).json(carroAtualizado);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function deletaCarro(req, res) {
    try {
        const carroDelete = carroService.deletaCarro(req.params.id);
        res.status(200).json(carroDelete);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
//# sourceMappingURL=carroController.js.map