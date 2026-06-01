"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const clienteRepository_1 = require("../repositories/clienteRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class ClienteService {
    clienteRepository = clienteRepository_1.ClienteRepository.getInstance();
    notaRepository = notaFiscalRepository_1.NotaFiscalRepository.getInstance();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    insereCliente(clienteBody) {
        if (!clienteBody.nome || !clienteBody.cpf || !clienteBody.telefone) {
            this.erroStatus.insereErro(400);
            throw new Error("Dados obrigatórios faltantes!!! [Nome, CPF, Telefone].");
        }
        if (this.clienteRepository.cpfRepetido(clienteBody.cpf) === -1) {
            return this.clienteRepository.insereCliente(clienteBody);
        }
        this.erroStatus.insereErro(409);
        throw new Error("Sistema já possuí um cliente cadastrado neste CPF.");
    }
    listaClientes() {
        if (this.clienteRepository.listaClientes() === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Nenhum Cliente cadastrado.");
        }
        return this.clienteRepository.listaClientes();
    }
    listaClienteID(id) {
        if (this.clienteRepository.listaClienteID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Cliente com este ID, não existe no sistema.");
        }
        return this.clienteRepository.listaClienteID(Number(id));
    }
    atualizaCliente(id, clienteBody) {
        if (this.clienteRepository.indexCliente(Number(id)) === -1) {
            this.erroStatus.insereErro(404);
            throw new Error("Cliente com este ID, não existe no sistema.");
        }
        if (this.clienteRepository.cpfRepetido(clienteBody.cpf) != -1) {
            this.erroStatus.insereErro(409);
            throw new Error("Não pode atualizar o CPF de um cliente que já tenha outro cadastrado. Use CPF diferente.");
        }
        return this.clienteRepository.atualizaCliente(Number(id), clienteBody);
    }
    deletaCliente(id) {
        if (this.clienteRepository.listaClienteID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Cliente com este ID, não está cadastrado no sistema.");
        }
        if (this.notaRepository.verificaNotaIDtabela(Number(id), "cliente") != -1) {
            this.erroStatus.insereErro(422);
            throw new Error("Cliente não pode ser excluído por conta que tem nota emitida.");
        }
        return this.clienteRepository.deletaCliente(id);
    }
    listaNotasCliente(id) {
        if (this.notaRepository.listaNotasporTabela(id, "cliente").length === 0) {
            this.erroStatus.insereErro(404);
            throw new Error("Cliente não possuí notas emitidas no sistema.");
        }
        return this.notaRepository.listaNotasporTabela(id, "cliente");
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=clienteService.js.map