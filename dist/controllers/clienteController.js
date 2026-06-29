"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const clienteService_1 = require("../services/clienteService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class ClienteController {
    clienteService = new clienteService_1.ClienteService();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async insereCliente(req, res) {
        try {
            const newCliente = await this.clienteService.insereCliente(req.body);
            res.status(201).json(newCliente);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaClientes(req, res) {
        try {
            const clientesList = await this.clienteService.listaClientes();
            res.status(200).json(clientesList);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaClienteID(req, res) {
        try {
            const clienteID = await this.clienteService.listaClienteID(req.params.id);
            res.status(200).json(clienteID);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async atualizaCliente(req, res) {
        try {
            const clienteAtualizado = await this.clienteService.atualizaCliente(req.params.id, req.body);
            res.status(200).json(clienteAtualizado);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async deleteCliente(req, res) {
        try {
            const clienteDelete = await this.clienteService.deletaCliente(req.params.id);
            res.status(200).json(clienteDelete);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaNotasCliente(req, res) {
        try {
            const notasID = await this.clienteService.listaNotasCliente(req.params.id);
            res.status(200).json(notasID);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
}
exports.ClienteController = ClienteController;
//# sourceMappingURL=clienteController.js.map