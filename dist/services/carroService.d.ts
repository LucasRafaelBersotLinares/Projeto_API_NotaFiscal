import { Carro } from "../models/carro";
import { CarroRepository } from "../repositories/carroRepository";
export declare class CarroService {
    carroRepository: CarroRepository;
    insereCarro(carroBody: any): Carro;
    listaCarros(): Carro[];
    listaCarroID(id: any): Carro | undefined;
    atualizaCarro(id: any, carroBody: any): Carro | undefined;
}
//# sourceMappingURL=carroService.d.ts.map