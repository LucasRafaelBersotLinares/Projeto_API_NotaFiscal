import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
export declare class ClienteService {
    clienteRepository: ClienteRepository;
    insereCliente(clienteBody: any): Cliente;
    listaClientes(): Cliente[];
}
//# sourceMappingURL=clienteService.d.ts.map