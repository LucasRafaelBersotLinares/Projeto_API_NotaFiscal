export class Vendedor {
    id_vendedor: number
    nome: string
    matricula: string
    comissao_percentual: number

    constructor(id_vendedor: number, nome: string, matricula: string, comissao_percentual: number){
        this.id_vendedor = this.geraId()
        this.nome = nome
        this.matricula = matricula
        this.comissao_percentual = comissao_percentual
    }

    geraId(): number {
        return Date.now();
    }
}