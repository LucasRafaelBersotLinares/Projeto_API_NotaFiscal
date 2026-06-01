import { Carro } from "../models/carro";
import { CarroRepository } from "../repositories/carroRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";
export declare class CarroService {
    carroRepository: CarroRepository;
    notaRepository: NotaFiscalRepository;
    estoqueRepository: EstoqueRepository;
    insereCarro(carroBody: any): Carro;
    listaCarros(): Carro[];
    listaCarroID(id: any): Carro | undefined;
    atualizaCarro(id: any, carroBody: any): Carro | undefined;
    deletaCarro(id: any): Carro[] | undefined;
}
//# sourceMappingURL=carroService.d.ts.map