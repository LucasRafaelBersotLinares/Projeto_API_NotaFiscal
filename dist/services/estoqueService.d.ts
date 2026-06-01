import { Estoque } from "../models/estoque";
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { CarroRepository } from "../repositories/carroRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class EstoqueService {
    estoqueRepository: EstoqueRepository;
    carroRepository: CarroRepository;
    erroStatus: ErroStatusRepository;
    insereEstoque(estoqueBody: any): Estoque;
    listaEstoque(): Estoque[];
    listaEstoqueID(id: any): Estoque | undefined;
    listaEstoqueIDCarro(id: any): Estoque | undefined;
    atualizaEstoque(id: any, estoqueBody: any): Estoque | undefined;
    deletaEstoque(id: any): Estoque[] | undefined;
}
//# sourceMappingURL=estoqueService.d.ts.map