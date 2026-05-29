import { Carro } from "../models/carro";
export declare class CarroRepository {
    private static instance;
    private carroList;
    private constructor();
    static getInstance(): CarroRepository;
    listaCarros(): Carro[];
    listaCarroID(id: number): Carro | undefined;
    placaRepetida(placa: string): number;
    insereCarro(carro: any): Carro;
    atualizaCarro(id: number, carroBody: any): Carro | undefined;
}
//# sourceMappingURL=carroRepository.d.ts.map