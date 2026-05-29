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
            return this.clienteRepository.insereCliente(clienteBody);
        }
        throw new Error("Sistema ja possui um cliente cadastrado neste CPF");
    }
    listaClientes() {
        if (this.clienteRepository.listaClientes() === undefined) {
            throw new Error("Nenhum Cliente cadastrado.");
        }
        return this.clienteRepository.listaClientes();
    }
    listaClienteID(id) {
        if (this.clienteRepository.listaClienteID(Number(id)) === undefined) {
            throw new Error("Cliente com este ID não existe no sistema.");
        }
        return this.clienteRepository.listaClienteID(Number(id));
    }
    atualizaCliente(id, clienteBody) {
        if (this.clienteRepository.atualizaCliente(Number(id), clienteBody) === undefined) {
            throw new Error("Cliente com este ID não existe no sistema.");
        }
        return this.clienteRepository.atualizaCliente(Number(id), clienteBody);
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=clienteService.js.map