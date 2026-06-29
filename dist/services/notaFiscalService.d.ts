import { NotaFiscal } from "../models/notaFiscal";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { CarroRepository } from "../repositories/carroRepository";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { ClienteRepository } from "../repositories/clienteRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class NotaFiscalService {
    notaRepository: NotaFiscalRepository;
    carroRepository: CarroRepository;
    vendedorRepository: VendedorRepository;
    clienteRepository: ClienteRepository;
    estoqueRepository: EstoqueRepository;
    erroStatus: ErroStatusRepository;
    emiteNota(notaBody: any): Promise<NotaFiscal | undefined>;
    listaNotas(): Promise<NotaFiscal[]>;
    listaNotaID(id: any): Promise<NotaFiscal | undefined>;
}
//# sourceMappingURL=notaFiscalService.d.ts.map