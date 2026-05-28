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
}