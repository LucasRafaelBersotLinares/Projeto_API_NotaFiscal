import { Estoque } from "../models/estoque";
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { CarroRepository } from "../repositories/carroRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class EstoqueService {
    estoqueRepository: EstoqueRepository;
    carroRepository: CarroRepository;
    erroStatus: ErroStatusRepository;
    insereEstoque(estoqueBody: any): Promise<Estoque>;
    listaEstoque(): Promise<Estoque[]>;
    listaEstoqueID(id: any): Promise<Estoque | undefined>;
    listaEstoqueCarroID(id: any): Promise<Estoque | undefined>;
    atualizaEstoque(id: any, estoqueBody: any): Promise<Estoque | undefined>;
    deletaEstoque(id: any): Promise<Estoque | undefined>;
}
//# sourceMappingURL=estoqueService.d.ts.map