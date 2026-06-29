"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereCliente = insereCliente;
exports.listaClientes = listaClientes;
exports.listaClienteID = listaClienteID;
exports.atualizaCliente = atualizaCliente;
exports.deletaCliente = deletaCliente;
exports.listaNotasCliente = listaNotasCliente;
const clienteService_1 = require("../services/clienteService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
const clienteService = new clienteService_1.ClienteService();
const erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
function insereCliente(req, res) {
    try {
        const newCliente = clienteService.insereCliente(req.body);
        res.status(201).json(newCliente);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaClientes(req, res) {
    try {
        const clientesList = clienteService.listaClientes();
        res.status(200).json(clientesList);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaClienteID(req, res) {
    try {
        const clienteID = clienteService.listaClienteID(req.params.id);
        res.status(200).json(clienteID);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function atualizaCliente(req, res) {
    try {
        const clienteAtualizado = clienteService.atualizaCliente(req.params.id, req.body);
        res.status(200).json(clienteAtualizado);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function deletaCliente(req, res) {
    try {
        const clienteDelete = clienteService.deletaCliente(req.params.id);
        res.status(200).json(clienteDelete);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaNotasCliente(req, res) {
    try {
        const notasID = clienteService.listaNotasCliente(req.params.id);
        res.status(200).json(notasID);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
//# sourceMappingURL=clienteController.js.map