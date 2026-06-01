"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereVendedor = insereVendedor;
exports.listaVendedores = listaVendedores;
exports.listaVendedorID = listaVendedorID;
exports.atualizaVendedor = atualizaVendedor;
exports.deletaVendedor = deletaVendedor;
exports.listaNotasVendedor = listaNotasVendedor;
const vendedorService_1 = require("../services/vendedorService");
const vendedorService = new vendedorService_1.VendedorService();
function insereVendedor(req, res) {
    try {
        const newVendedor = vendedorService.insereVendedor(req.body);
        res.status(201).json({
            message: "Vendedor cadastrado com sucesso!!!",
            vendedor: newVendedor
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function listaVendedores(req, res) {
    try {
        const vendedorList = vendedorService.listaVendedores();
        res.status(200).json({
            vendedorList
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function listaVendedorID(req, res) {
    try {
        const vendedorID = vendedorService.listaVendedorID(req.params.id);
        res.status(200).json({
            message: "Vendedor:",
            vendedorID
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function atualizaVendedor(req, res) {
    try {
        const vendedorAtualizado = vendedorService.atualizaVendedor(req.params.id, req.body);
        res.status(200).json({
            message: "Vendedor Atualizado: ",
            vendedorAtualizado
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function deletaVendedor(req, res) {
    try {
        const vendedorDelete = vendedorService.deletaVendedor(req.params.id);
        res.status(200).json({
            message: "Lista de vendedores restantes:",
            vendedorDelete
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function listaNotasVendedor(req, res) {
    try {
        const notasID = vendedorService.listaNotasVendedor(req.params.id);
        res.status(200).json({
            message: "Notas do Vendedor:",
            notasID
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//# sourceMappingURL=vendedorController.js.map