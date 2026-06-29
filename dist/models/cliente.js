"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    id_cliente;
    nome;
    cpf;
    telefone;
    email;
    cidade;
    constructor(id_cliente, nome, cpf, telefone, email, cidade) {
        this.id_cliente = id_cliente;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.cidade = cidade;
    }
}
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.js.map