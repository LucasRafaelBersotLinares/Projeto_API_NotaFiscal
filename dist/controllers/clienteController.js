"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereCliente = insereCliente;
exports.listaClientes = listaClientes;
exports.listaClienteID = listaClienteID;
const clienteService_1 = require("../services/clienteService");
const clienteService = new clienteService_1.ClienteService();
function insereCliente(req, res) {
    try {
        const newCliente = clienteService.insereCliente(req.body);
        res.status(201).json({
            message: "Cliente cadastrado com sucesso!!!",
            cliente: newCliente
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function listaClientes(req, res) {
    try {
        const clientesList = clienteService.listaClientes();
        res.status(200).json({
            clientesList
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function listaClienteID(req, res) {
    try {
        const clienteID = clienteService.listaClienteID(req.params.id);
        res.status(200).json({
            message: "Cliente:",
            clienteID
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//# sourceMappingURL=clienteController.js.map