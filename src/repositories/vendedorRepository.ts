import { Vendedor } from "../models/vendedor"

export class VendedorRepository {
    private static instance: VendedorRepository
    private vendedorList: Vendedor[] = []
    private constructor() {}

    public static getInstance(): VendedorRepository {
        if(!this.instance){
            this.instance = new VendedorRepository()
        }
        return this.instance
    }

    insereVendedor(vendedor: Vendedor): Vendedor {
        const newVendedor = new Vendedor(vendedor.nome,vendedor.matricula,vendedor.comissao_percentual)
        this.vendedorList.push(newVendedor)
        return newVendedor
    }

    matriculaRepetida(matricula: string): number{
        return this.vendedorList.findIndex(vendedor => vendedor.matricula === matricula)
    }

    listaVendedor(): Vendedor[] {
        return this.vendedorList
    }

}