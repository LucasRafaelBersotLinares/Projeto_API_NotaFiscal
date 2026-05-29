import { Carro } from "../models/carro";
export declare class CarroRepository {
    private static instance;
    private carroList;
    private constructor();
    static getInstance(): CarroRepository;
    listaCarros(): Carro[];
    placaRepetida(placa: string): number;
    insereCarro(carro: Carro): Carro;
}
//# sourceMappingURL=carroRepository.d.ts.map