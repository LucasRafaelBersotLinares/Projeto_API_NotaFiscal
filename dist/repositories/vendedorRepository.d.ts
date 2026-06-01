import { Vendedor } from "../models/vendedor";
export declare class VendedorRepository {
    private static instance;
    private vendedorList;
    private constructor();
    static getInstance(): VendedorRepository;
    listaVendedores(): Vendedor[];
    listaVendedorID(id: number): Vendedor | undefined;
    matriculaRepetida(matricula: string): number;
    insereVendedor(vendedor: any): Vendedor;
    indexVendedor(id: any): number;
    atualizaVendedor(id: number, vendedorBody: any): Vendedor | undefined;
    deletaVendedor(id: number): Vendedor[] | undefined;
}
//# sourceMappingURL=vendedorRepository.d.ts.map