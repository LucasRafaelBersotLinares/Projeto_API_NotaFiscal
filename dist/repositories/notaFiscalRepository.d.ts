import { NotaFiscal } from "../models/notaFiscal";
export declare class NotaFiscalRepository {
    private static instance;
    private notaList;
    private constructor();
    static getInstance(): NotaFiscalRepository;
    emiteNota(nota: any): NotaFiscal;
    notaDuplicada(numero: any): number;
    listaNotas(): NotaFiscal[];
    listaNotaID(id: number): NotaFiscal | undefined;
    verificaNotaIDtabela(id: any, tabela: string): number;
    listaNotasporTabela(id: number, tabela: string): NotaFiscal[] | undefined;
}
//# sourceMappingURL=notaFiscalRepository.d.ts.map