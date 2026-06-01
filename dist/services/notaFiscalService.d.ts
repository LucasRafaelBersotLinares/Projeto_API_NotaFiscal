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
    verificarExistencia(tabela: string, valor: any): number;
    emiteNota(notaBody: any): NotaFiscal | undefined;
    listaNotas(): NotaFiscal[];
    listaNotaID(id: any): NotaFiscal | undefined;
}
//# sourceMappingURL=notaFiscalService.d.ts.map