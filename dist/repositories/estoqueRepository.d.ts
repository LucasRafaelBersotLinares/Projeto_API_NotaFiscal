import { Estoque } from "../models/estoque";
export declare class EstoqueRepository {
    private static instance;
    private estoqueList;
    private constructor();
    static getInstance(): EstoqueRepository;
    insereEstoque(estoque: any): Estoque;
    idCarroDuplicado(id: number): number;
    listaEstoque(): Estoque[];
}
//# sourceMappingURL=estoqueRepository.d.ts.map