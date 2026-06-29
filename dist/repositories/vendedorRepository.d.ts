import { Vendedor } from "../models/vendedor";
export declare class VendedorRepository {
    private static instance;
    private constructor();
    static getInstance(): VendedorRepository;
    static getCreateTableQuery(): string;
    insereVendedor(vendedor: Vendedor): Promise<Vendedor>;
}
//# sourceMappingURL=vendedorRepository.d.ts.map