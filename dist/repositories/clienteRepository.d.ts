import { Cliente } from "../models/cliente";
export declare class ClienteRepository {
    private static instance;
    private constructor();
    static getInstance(): ClienteRepository;
    static getCreateTableQuery(): string;
    insereCliente(cliente: Cliente): Promise<Cliente>;
    listaClientes(): Promise<Cliente[]>;
    listaClienteID(id: any): Promise<Cliente | undefined>;
    atualizaCliente(id: any, clienteBody: any): Promise<Cliente>;
    deleteCliente(id: any): Promise<Cliente | undefined>;
}
//# sourceMappingURL=clienteRepository.d.ts.map