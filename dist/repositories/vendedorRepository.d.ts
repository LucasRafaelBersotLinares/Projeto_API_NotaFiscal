import { Vendedor } from "../models/vendedor";
export declare class VendedorRepository {
    private static instance;
    private vendedorList;
    private constructor();
    static getInstance(): VendedorRepository;
    insereVendedor(vendedor: Vendedor): Vendedor;
    matriculaRepetida(matricula: string): number;
}
//# sourceMappingURL=vendedorRepository.d.ts.map