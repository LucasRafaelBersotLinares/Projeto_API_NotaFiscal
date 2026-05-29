import { Estoque } from "../models/estoque";
export declare class EstoqueRepository {
    private static instance;
    private estoqueList;
    private constructor();
    static getInstance(): EstoqueRepository;
    insereEstoque(estoque: any): Estoque;
    idCarroDuplicado(id: number): number;
    listaEstoque(): Estoque[];
    listaEstoqueID(id: number): Estoque | undefined;
    listaEstoqueIDCarro(id_carro: number): Estoque | undefined;
    atualizaEstoque(id: number, estoqueBody: any): Estoque | undefined;
}
//# sourceMappingURL=estoqueRepository.d.ts.map