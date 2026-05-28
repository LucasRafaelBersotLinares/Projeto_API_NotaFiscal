import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
export declare class ClienteService {
    clienteRepository: ClienteRepository;
    insereCliente(clienteBody: any): Cliente;
    listaClientes(): Cliente[];
    listaClienteID(id: any): Cliente | undefined;
    atualizaCliente(id: any, clienteBody: any): Cliente | undefined;
}
//# sourceMappingURL=clienteService.d.ts.map