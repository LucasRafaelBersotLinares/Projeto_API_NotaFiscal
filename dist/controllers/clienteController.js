"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereCliente = insereCliente;
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
//# sourceMappingURL=clienteController.js.map