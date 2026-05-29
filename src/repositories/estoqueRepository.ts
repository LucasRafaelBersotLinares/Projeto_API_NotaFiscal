import { Estoque } from "../models/estoque"

export class EstoqueRepository {
    private static instance: EstoqueRepository
    private estoqueList: Estoque[] = []
    private constructor() {}

    public static getInstance(): EstoqueRepository {
        if(!this.instance){
            this.instance = new EstoqueRepository()
        }
        return this.instance
    }

    insereEstoque(estoque: any): Estoque | undefined {


    }




}