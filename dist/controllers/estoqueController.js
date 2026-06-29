"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const estoqueService_1 = require("../services/estoqueService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class EstoqueController {
    estoqueService = new estoqueService_1.EstoqueService();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async insereEstoque(req, res) {
        try {
            const newEstoque = await this.estoqueService.insereEstoque(req.body);
            res.status(201).json(newEstoque);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaEstoque(req, res) {
        try {
            const estoqueList = await this.estoqueService.listaEstoque();
            res.status(200).json(estoqueList);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaEstoqueID(req, res) {
        try {
            const estoqueID = await this.estoqueService.listaEstoqueID(req.params.id);
            res.status(200).json(estoqueID);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaEstoqueCarroID(req, res) {
        try {
            const estoqueIDCarro = await this.estoqueService.listaEstoqueCarroID(req.params.id);
            res.status(200).json(estoqueIDCarro);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async atualizaEstoque(req, res) {
        try {
            const estoqueAtualizado = await this.estoqueService.atualizaEstoque(req.params.id, req.body);
            res.status(200).json(estoqueAtualizado);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async deleteEstoque(req, res) {
        try {
            const estoqueDelete = await this.estoqueService.deletaEstoque(req.params.id);
            res.status(200).json(estoqueDelete);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
}
exports.EstoqueController = EstoqueController;
//# sourceMappingURL=estoqueController.js.map