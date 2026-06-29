import { Cliente } from "../models/cliente";
export declare class ClienteRepository {
    private static instance;
    private constructor();
    static getInstance(): ClienteRepository;
    static getCreateTableQuery(): string;
    insereCliente(cliente: Cliente): Promise<Cliente>;
}
//# sourceMappingURL=clienteRepository.d.ts.map