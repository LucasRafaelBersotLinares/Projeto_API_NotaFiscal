import { NotaFiscal } from "../models/notaFiscal";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { CarroRepository } from "../repositories/carroRepository";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { ClienteRepository } from "../repositories/clienteRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";
export declare class NotaFiscalService {
    notaRepository: NotaFiscalRepository;
    carroRepository: CarroRepository;
    vendedorRepository: VendedorRepository;
    clienteRepository: ClienteRepository;
    estoqueRepository: EstoqueRepository;
    verificarExistencia(tabela: string, valor: any): number;
    emiteNota(notaBody: any): NotaFiscal | undefined;
    listaNotas(): NotaFiscal[];
}
//# sourceMappingURL=notaFiscalService.d.ts.map