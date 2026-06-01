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

    emiteNota(nota: any): NotaFiscal {
        const newNota = new NotaFiscal(nota.numero_nota,nota.data_emissao,nota.valor_total,nota.id_cliente,nota.id_vendedor,nota.id_carro)
        this.notaList.push(newNota)
        return newNota
    }

    notaDuplicada(numero: any): number {
        return this.notaList.findIndex(nota => nota.numero_nota === numero)
    }

    listaNotas(): NotaFiscal[] {
        return this.notaList
    }

    listaNotaIDporTabela(id: number, tabela: string): NotaFiscal | undefined{
        switch(tabela){
            case "nota":
                return this.notaList.find(nota => nota.id_nota === id)
                break
            case "vendedor":
                return this.notaList.find(nota => nota.id_vendedor === id)
                break
            case "cliente":
                return this.notaList.find(nota => nota.id_cliente === id)
                break
            default:
             return undefined
        }
    }

    verificaNotaIDtabela(id: any, tabela: string): number{
        switch(tabela){
            case "cliente":
                return this.notaList.findIndex(vendedor => vendedor.id_vendedor === id)
                break
            case "vendedor":
                return this.notaList.findIndex(vendedor => vendedor.id_vendedor === id)
                break
            default:
                return -1
        }
    }


}