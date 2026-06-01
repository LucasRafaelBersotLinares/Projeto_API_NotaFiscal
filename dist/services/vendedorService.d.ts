import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
export declare class VendedorService {
    vendedorRepository: VendedorRepository;
    notaRepository: NotaFiscalRepository;
    insereVendedor(vendedorBody: any): Vendedor;
    listaVendedores(): Vendedor[];
    listaVendedorID(id: any): Vendedor | undefined;
    atualizaVendedor(id: any, vendedorBody: any): Vendedor | undefined;
    deletaVendedor(id: any): Vendedor[] | undefined;
}
//# sourceMappingURL=vendedorService.d.ts.map