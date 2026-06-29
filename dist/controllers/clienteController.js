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
}
exports.ClienteController = ClienteController;
//# sourceMappingURL=clienteController.js.map