import { Estoque } from "../models/estoque";
export declare class EstoqueRepository {
    private static instance;
    private constructor();
    static getInstance(): EstoqueRepository;
    static getCreateTableQuery(): string;
    insereEstoque(estoque: Estoque): Promise<Estoque>;
    listaEstoques(): Promise<Estoque[]>;
    listaEstoqueID(id: any): Promise<Estoque | undefined>;
    atualizaEstoque(id: any, estoqueBody: any): Promise<Estoque>;
    carroDuplicado(id: any): Promise<Estoque | undefined>;
    deleteEstoque(id: any): Promise<Estoque | undefined>;
}
//# sourceMappingURL=estoqueRepository.d.ts.map