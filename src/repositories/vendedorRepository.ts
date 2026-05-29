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

    listaVendedores(): Vendedor[] {
        return this.vendedorList
    }

    listaVendedorID(id: number): Vendedor | undefined{
        return this.vendedorList.find(vendedor => vendedor.id_vendedor === id)
    }

    matriculaRepetida(matricula: string): number{
        return this.vendedorList.findIndex(vendedor => vendedor.matricula === matricula)
    }

    insereVendedor(vendedor: any): Vendedor {
        const newVendedor = new Vendedor(vendedor.nome,vendedor.matricula,vendedor.comissao_percentual)
        this.vendedorList.push(newVendedor)
        return newVendedor
    }

    indexVendedor(id: any){
        return this.vendedorList.findIndex((vendedor => vendedor.id_vendedor === id))
    }


    atualizaVendedor(id: number, vendedorBody: any): Vendedor | undefined {
        let vendedorIndex: number = this.vendedorList.findIndex((vendedor => vendedor.id_vendedor === id))

        if(vendedorIndex === -1){
            return undefined
        }
        this.vendedorList[vendedorIndex]!.nome = vendedorBody.nome ?? this.vendedorList[vendedorIndex]!.nome
        this.vendedorList[vendedorIndex]!.matricula = vendedorBody.matricula ?? this.vendedorList[vendedorIndex]!.matricula
        this.vendedorList[vendedorIndex]!.comissao_percentual = vendedorBody.comissao_percentual ?? this.vendedorList[vendedorIndex]!.comissao_percentual
        return this.vendedorList[vendedorIndex]
    }
}