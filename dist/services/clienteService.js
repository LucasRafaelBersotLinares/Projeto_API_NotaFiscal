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
    async listaClientes() {
        if (await this.clienteRepository.listaClientes() === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Nenhum Cliente cadastrado.");
        }
        return this.clienteRepository.listaClientes();
    }
    async listaClienteID(id) {
        if (await this.clienteRepository.listaClienteID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Cliente com este ID, não existe no sistema.");
        }
        return this.clienteRepository.listaClienteID(Number(id));
    }
    async atualizaCliente(id, clienteBody) {
        if (await this.clienteRepository.listaClienteID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Cliente com este ID, não existe no sistema.");
        }
        // const indexId = this.clienteRepository.indexCliente(Number(id));
        // const indexCPF = this.clienteRepository.cpfRepetido(clienteBody.cpf);
        // if(indexCPF !== -1 && indexCPF !== indexId){
        //     this.erroStatus.insereErro(409)
        //     throw new Error("Não pode ter um vendedor com uma matrícula já cadastrada. Atualize com outra matrícula.")
        // }
        return this.clienteRepository.atualizaCliente(Number(id), clienteBody);
    }
    async deletaCliente(id) {
        if (await this.clienteRepository.listaClienteID(Number(id)) === undefined) {
            this.erroStatus.insereErro(404);
            throw new Error("Cliente com este ID, não está cadastrado no sistema.");
        }
        // if(this.notaRepository.verificaNotaIDtabela(Number(id),"cliente") != -1){
        //     this.erroStatus.insereErro(422)
        //     throw new Error("Cliente não pode ser excluído por conta que tem nota emitida.")
        // }
        return this.clienteRepository.deleteCliente(id);
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=clienteService.js.map