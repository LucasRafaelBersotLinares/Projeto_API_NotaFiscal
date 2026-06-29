import { NotaFiscal } from "../models/notaFiscal";
export declare class NotaFiscalRepository {
    private static instance;
    private constructor();
    static getInstance(): NotaFiscalRepository;
    static getCreateTableQuery(): string;
    emiteNota(nota: any): Promise<NotaFiscal>;
    listaNotas(): Promise<NotaFiscal[]>;
    notaDuplicada(nota: string): Promise<NotaFiscal | undefined>;
    listaNotaID(id: number): Promise<NotaFiscal | undefined>;
}
//# sourceMappingURL=notaFiscalRepository.d.ts.map