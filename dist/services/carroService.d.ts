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
    insereCarro(carroBody: any): Promise<Carro>;
    listaCarros(): Promise<Carro[]>;
    listaCarroID(id: any): Promise<Carro | undefined>;
    listaCarroDisponivel(): Promise<any[] | undefined>;
    atualizaCarro(id: any, carroBody: any): Promise<Carro | undefined>;
    deleteCarro(id: any): Promise<Carro | undefined>;
}
//# sourceMappingURL=carroService.d.ts.map