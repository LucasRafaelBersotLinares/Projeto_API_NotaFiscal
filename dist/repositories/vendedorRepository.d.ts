import { Vendedor } from "../models/vendedor";
export declare class VendedorRepository {
    private static instance;
    private constructor();
    static getInstance(): VendedorRepository;
    static getCreateTableQuery(): string;
    insereVendedor(vendedor: Vendedor): Promise<Vendedor>;
    listaVendedores(): Promise<Vendedor[]>;
    listaVendedorID(id: any): Promise<Vendedor | undefined>;
    atualizaVendedor(id: any, vendedorBody: any): Promise<Vendedor>;
    deleteVendedor(id: any): Promise<Vendedor | undefined>;
}
//# sourceMappingURL=vendedorRepository.d.ts.map