"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const cliente_1 = require("../models/cliente");
const clienteRepository_1 = require("../repositories/clienteRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class ClienteService {
    clienteRepository = clienteRepository_1.ClienteRepository.getInstance();
    notaRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async insereCliente(clienteBody) {
        if (!clienteBody.nome || !clienteBody.cpf || !clienteBody.telefone) {
            this.erroStatus.insereErro(400);
            throw new Error("Dados obrigatórios faltantes!!! [Nome, CPF, Telefone].");
        }
        const novoCliente = new cliente_1.Cliente(null, clienteBody.nome, clienteBody.cpf, clienteBody.telefone, clienteBody.email, clienteBody.cidade);
        return this.clienteRepository.insereCliente(novoCliente);
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=clienteService.js.map