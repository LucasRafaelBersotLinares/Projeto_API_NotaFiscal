"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorController = void 0;
const vendedorService_1 = require("../services/vendedorService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class VendedorController {
    vendedorService = new vendedorService_1.VendedorService();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async insereVendedor(req, res) {
        try {
            const newVendedor = await this.vendedorService.insereVendedor(req.body);
            res.status(201).json(newVendedor);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaVendedores(req, res) {
        try {
            const vendedorList = await this.vendedorService.listaVendedores();
            res.status(200).json(vendedorList);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaVendedorID(req, res) {
        try {
            const vendedorID = await this.vendedorService.listaVendedorID(req.params.id);
            res.status(200).json(vendedorID);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async atualizaVendedor(req, res) {
        try {
            const vendedorAtualizado = await this.vendedorService.atualizaVendedor(req.params.id, req.body);
            res.status(200).json(vendedorAtualizado);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async deleteVendedor(req, res) {
        try {
            const vendedorDelete = await this.vendedorService.deleteVendedor(req.params.id);
            res.status(200).json(vendedorDelete);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaNotasVendedor(req, res) {
        try {
            const notasID = await this.vendedorService.listaNotasVendedor(req.params.id);
            res.status(200).json(notasID);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
}
exports.VendedorController = VendedorController;
//# sourceMappingURL=vendedorController.js.map