"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereVendedor = insereVendedor;
exports.listaVendedores = listaVendedores;
exports.listaVendedorID = listaVendedorID;
exports.atualizaVendedor = atualizaVendedor;
exports.deletaVendedor = deletaVendedor;
exports.listaNotasVendedor = listaNotasVendedor;
const vendedorService_1 = require("../services/vendedorService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
const vendedorService = new vendedorService_1.VendedorService();
const erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
function insereVendedor(req, res) {
    try {
        const newVendedor = vendedorService.insereVendedor(req.body);
        res.status(201).json(newVendedor);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaVendedores(req, res) {
    try {
        const vendedorList = vendedorService.listaVendedores();
        res.status(200).json(vendedorList);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaVendedorID(req, res) {
    try {
        const vendedorID = vendedorService.listaVendedorID(req.params.id);
        res.status(200).json(vendedorID);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function atualizaVendedor(req, res) {
    try {
        const vendedorAtualizado = vendedorService.atualizaVendedor(req.params.id, req.body);
        res.status(200).json(vendedorAtualizado);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function deletaVendedor(req, res) {
    try {
        const vendedorDelete = vendedorService.deletaVendedor(req.params.id);
        res.status(200).json(vendedorDelete);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaNotasVendedor(req, res) {
    try {
        const notasID = vendedorService.listaNotasVendedor(req.params.id);
        res.status(200).json(notasID);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
//# sourceMappingURL=vendedorController.js.map