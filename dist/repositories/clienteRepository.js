"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const cliente_1 = require("../models/cliente");
class ClienteRepository {
    static instance;
    clienteList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ClienteRepository();
        }
        return this.instance;
    }
    listaClientes() {
        return this.clienteList;
    }
    listaClienteID(id) {
        return this.clienteList.find(cliente => cliente.id_cliente === id);
    }
    cpfRepetido(cpf) {
        return this.clienteList.findIndex(cliente => cliente.cpf === cpf);
    }
    insereCliente(cliente) {
        const newCliente = new cliente_1.Cliente(cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade);
        this.clienteList.push(newCliente);
        return newCliente;
    }
    atualizaCliente(id, clienteBody) {
        let clienteIndex = this.clienteList.findIndex((cliente => cliente.id_cliente === id));
        if (clienteIndex === -1) {
            return undefined;
        }
        this.clienteList[clienteIndex].nome = clienteBody.nome ?? this.clienteList[clienteIndex].nome;
        this.clienteList[clienteIndex].cpf = clienteBody.cpf ?? this.clienteList[clienteIndex].cpf;
        this.clienteList[clienteIndex].email = clienteBody.email ?? this.clienteList[clienteIndex].email;
        this.clienteList[clienteIndex].cidade = clienteBody.cidade ?? this.clienteList[clienteIndex].cidade;
        this.clienteList[clienteIndex].telefone = clienteBody.telefone ?? this.clienteList[clienteIndex].telefone;
        return this.clienteList[clienteIndex];
    }
    deletaCliente(id) {
        return this.clienteList = this.clienteList.filter(cliente => cliente.id_cliente != id);
    }
}
exports.ClienteRepository = ClienteRepository;
//# sourceMappingURL=clienteRepository.js.map