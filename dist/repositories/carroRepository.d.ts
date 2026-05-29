import { Carro } from "../models/carro";
export declare class CarroRepository {
    private static instance;
    private carroList;
    private constructor();
    static getInstance(): CarroRepository;
    listaCarros(): Carro[];
    insereCarro(carro: Carro): Carro;
    placaRepetida(placa: string): number;
}
//# sourceMappingURL=carroRepository.d.ts.map