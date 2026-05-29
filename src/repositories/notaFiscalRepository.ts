import { NotaFiscal } from "../models/notaFiscal"

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository
    private notaList: NotaFiscal[] = []
    private constructor() {}

    public static getInstance(): NotaFiscalRepository {
        if(!this.instance){
            this.instance = new NotaFiscalRepository()
        }
        return this.instance
    }
}