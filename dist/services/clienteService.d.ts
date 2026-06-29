import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class ClienteService {
    clienteRepository: ClienteRepository;
    notaRepository: NotaFiscalRepository;
    erroStatus: ErroStatusRepository;
    insereCliente(clienteBody: any): Promise<Cliente>;
}
//# sourceMappingURL=clienteService.d.ts.map