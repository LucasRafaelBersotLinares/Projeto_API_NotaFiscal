import { ErroStatus } from "../models/erroStatus"

export class ErroStatusRepository {
    private static instance: ErroStatusRepository
    private erroStatusList: ErroStatus[] = []
    private constructor() {}

    public static getInstance(): ErroStatusRepository {
        if(!this.instance){
            this.instance = new ErroStatusRepository()
        }
        return this.instance
    }

    insereErro(status: number){
        const newStatus = new ErroStatus(status)
        this.erroStatusList[0] = newStatus
    }

    mostraErro(): number{
        return this.erroStatusList[0]!.status
    }
}