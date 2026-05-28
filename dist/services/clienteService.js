"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const clienteRepository_1 = require("../repositories/clienteRepository");
class ClienteService {
    clienteRepository = clienteRepository_1.ClienteRepository.getInstance();
    insereCliente(clienteBody) {
        if (!clienteBody.nome || !clienteBody.cpf || !clienteBody.telefone) {
            throw new Error("Dados obrigatórios faltantes!!!\n[Nome, CPF, Telefone]");
        }
        if (this.clienteRepository.cpfRepetido(clienteBody.cpf) === -1) {
            this.clienteRepository.insereCliente(clienteBody);
            return clienteBody;
        }
        throw new Error("Sistema ja possui um cliente cadastrado neste CPF");
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=clienteService.js.map