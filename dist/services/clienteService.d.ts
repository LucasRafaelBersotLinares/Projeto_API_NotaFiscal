import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { NotaFiscal } from "../models/notaFiscal";
export declare class ClienteService {
    clienteRepository: ClienteRepository;
    notaRepository: NotaFiscalRepository;
    insereCliente(clienteBody: any): Cliente;
    listaClientes(): Cliente[];
    listaClienteID(id: any): Cliente | undefined;
    atualizaCliente(id: any, clienteBody: any): Cliente | undefined;
    deletaCliente(id: any): Cliente[] | undefined;
    listaNotasCliente(id: any): NotaFiscal[] | undefined;
}
//# sourceMappingURL=clienteService.d.ts.map