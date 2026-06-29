import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { NotaFiscal } from "../models/notaFiscal";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class VendedorService {
    vendedorRepository: VendedorRepository;
    notaRepository: NotaFiscalRepository;
    erroStatus: ErroStatusRepository;
    insereVendedor(vendedorBody: any): Promise<Vendedor>;
    listaVendedores(): Promise<Vendedor[]>;
    listaVendedorID(id: any): Promise<Vendedor | undefined>;
    atualizaVendedor(id: any, vendedorBody: any): Promise<Vendedor | undefined>;
    deleteVendedor(id: any): Promise<Vendedor | undefined>;
    listaNotasVendedor(id: any): Promise<NotaFiscal[] | undefined>;
}
//# sourceMappingURL=vendedorService.d.ts.map