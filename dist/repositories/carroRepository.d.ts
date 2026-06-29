import { Carro } from "../models/carro";
export declare class CarroRepository {
    private static instance;
    private constructor();
    static getInstance(): CarroRepository;
    static getCreateTableQuery(): string;
    insereCarro(carro: Carro): Promise<Carro>;
    listaCarros(): Promise<Carro[]>;
    listaCarroID(id: any): Promise<Carro | undefined>;
    placaRepetida(placa: string): Promise<Carro | undefined>;
    atualizaCarro(id: any, carroBody: any): Promise<Carro>;
    deleteCarro(id: any): Promise<Carro | undefined>;
}
//# sourceMappingURL=carroRepository.d.ts.map