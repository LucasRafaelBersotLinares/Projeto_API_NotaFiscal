import { Vendedor } from "../models/vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class VendedorService {
    vendedorRepository: VendedorRepository;
    erroStatus: ErroStatusRepository;
    insereVendedor(vendedorBody: any): Promise<Vendedor>;
}
//# sourceMappingURL=vendedorService.d.ts.map