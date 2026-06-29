import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class ClienteService {
    clienteRepository: ClienteRepository;
    erroStatus: ErroStatusRepository;
    insereCliente(clienteBody: any): Promise<Cliente>;
    listaClientes(): Promise<Cliente[]>;
    listaClienteID(id: any): Promise<Cliente | undefined>;
    atualizaCliente(id: any, clienteBody: any): Promise<Cliente | undefined>;
    deletaCliente(id: any): Promise<Cliente | undefined>;
}
//# sourceMappingURL=clienteService.d.ts.map