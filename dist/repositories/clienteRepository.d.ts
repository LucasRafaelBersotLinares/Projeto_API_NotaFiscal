import { Cliente } from "../models/cliente";
export declare class ClienteRepository {
    private static instance;
    private clienteList;
    private constructor();
    static getInstance(): ClienteRepository;
    listaClientes(): Cliente[];
    listaClienteID(id: number): Cliente | undefined;
    cpfRepetido(cpf: string): number;
    insereCliente(cliente: any): Cliente;
    atualizaCliente(id: number, clienteBody: any): Cliente | undefined;
    deletaCliente(id: number): Cliente[] | undefined;
}
//# sourceMappingURL=clienteRepository.d.ts.map