import { Carro } from "../models/carro";
import { CarroRepository } from "../repositories/carroRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class CarroService {
    carroRepository: CarroRepository;
    notaRepository: NotaFiscalRepository;
    estoqueRepository: EstoqueRepository;
    erroStatus: ErroStatusRepository;
    insereCarro(carroBody: any): Carro;
    listaCarros(): Carro[];
    listaCarroID(id: any): Carro | undefined;
    atualizaCarro(id: any, carroBody: any): Carro | undefined;
    deletaCarro(id: any): Carro[] | undefined;
}
//# sourceMappingURL=carroService.d.ts.map