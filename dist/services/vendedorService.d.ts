import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
export declare class VendedorService {
    vendedorRepository: VendedorRepository;
    insereVendedor(vendedorBody: any): Vendedor;
    listaVendedores(): Vendedor[];
    listaVendedorID(id: any): Vendedor | undefined;
}
//# sourceMappingURL=vendedorService.d.ts.map