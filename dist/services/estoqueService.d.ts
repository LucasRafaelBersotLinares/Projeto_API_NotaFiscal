import { Estoque } from "../models/estoque";
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { CarroRepository } from "../repositories/carroRepository";
export declare class EstoqueService {
    estoqueRepository: EstoqueRepository;
    carroRepository: CarroRepository;
    insereEstoque(estoqueBody: any): Estoque;
    listaEstoque(): Estoque[];
}
//# sourceMappingURL=estoqueService.d.ts.map