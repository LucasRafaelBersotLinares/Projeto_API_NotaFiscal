import { Carro } from "../models/carro"

export class CarroRepository {
    private static instance: CarroRepository
    private carroeList: Carro[] = []
    private constructor() {}

    public static getInstance(): CarroRepository {
        if(!this.instance){
            this.instance = new CarroRepository()
        }
        return this.instance
    }



    
}