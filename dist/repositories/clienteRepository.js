"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
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
        this.clienteList.push(cliente);
    }
    atualizaCliente(id, cliente) {
        let clienteIndex = this.clienteList.findIndex((cliente => cliente.id_cliente === id));
        if (clienteIndex === -1) {
            return undefined;
        }
        this.clienteList[clienteIndex] = cliente;
    }
    deletaCliente(id) {
        return this.clienteList = this.clienteList.filter(cliente => cliente.id_cliente != id);
    }
}
exports.ClienteRepository = ClienteRepository;
//# sourceMappingURL=clienteRepository.js.map