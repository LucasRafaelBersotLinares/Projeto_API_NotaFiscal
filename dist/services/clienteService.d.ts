import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class ClienteService {
    clienteRepository: ClienteRepository;
    notaRepository: NotaFiscalRepository;
    erroStatus: ErroStatusRepository;
    insereCliente(clienteBody: any): Promise<Cliente>;
    listaClientes(): Promise<Cliente[]>;
    listaClienteID(id: any): Promise<Cliente | undefined>;
    atualizaCliente(id: any, clienteBody: any): Promise<Cliente | undefined>;
    deletaCliente(id: any): Promise<Cliente | undefined>;
}
//# sourceMappingURL=clienteService.d.ts.map