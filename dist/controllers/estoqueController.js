"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereEstoque = insereEstoque;
exports.listaEstoque = listaEstoque;
exports.listaEstoqueID = listaEstoqueID;
exports.listaEstoqueIDCarro = listaEstoqueIDCarro;
exports.atualizaEstoque = atualizaEstoque;
exports.deletaEstoque = deletaEstoque;
const estoqueService_1 = require("../services/estoqueService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
const estoqueService = new estoqueService_1.EstoqueService();
const erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
function insereEstoque(req, res) {
    try {
        const newEstoque = estoqueService.insereEstoque(req.body);
        res.status(201).json({
            message: "Estoque cadastrado com sucesso!!!",
            estoque: newEstoque
        });
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaEstoque(req, res) {
    try {
        const estoqueList = estoqueService.listaEstoque();
        res.status(200).json({
            message: "Lista dos Estoques Lançados:",
            estoqueList
        });
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaEstoqueID(req, res) {
    try {
        const estoqueID = estoqueService.listaEstoqueID(req.params.id);
        res.status(200).json({
            message: "Estoque encontrado:",
            estoqueID
        });
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaEstoqueIDCarro(req, res) {
    try {
        const estoqueIDCarro = estoqueService.listaEstoqueIDCarro(req.params.id);
        res.status(200).json({
            message: "Estoque encontrado:",
            estoqueIDCarro
        });
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function atualizaEstoque(req, res) {
    try {
        const estoqueAtualizado = estoqueService.atualizaEstoque(req.params.id, req.body);
        res.status(200).json({
            message: "Estoque Atualizado: ",
            estoqueAtualizado
        });
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function deletaEstoque(req, res) {
    try {
        const estoqueDelete = estoqueService.deletaEstoque(req.params.id);
        res.status(200).json({
            message: "Lista de Estoque Restantes: ",
            estoqueDelete
        });
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
//# sourceMappingURL=estoqueController.js.map