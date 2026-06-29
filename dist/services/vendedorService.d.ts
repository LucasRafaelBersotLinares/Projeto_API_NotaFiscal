import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class VendedorService {
    vendedorRepository: VendedorRepository;
    erroStatus: ErroStatusRepository;
    insereVendedor(vendedorBody: any): Promise<Vendedor>;
    listaVendedores(): Promise<Vendedor[]>;
    listaVendedorID(id: any): Promise<Vendedor | undefined>;
    atualizaVendedor(id: any, vendedorBody: any): Promise<Vendedor | undefined>;
    deleteVendedor(id: any): Promise<Vendedor | undefined>;
}
//# sourceMappingURL=vendedorService.d.ts.map