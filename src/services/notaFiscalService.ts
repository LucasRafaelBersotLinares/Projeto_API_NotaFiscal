import { NotaFiscal } from "../models/notaFiscal"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
import { CarroRepository } from "../repositories/carroRepository"
import { VendedorRepository } from "../repositories/vendedorRepository"
import { ClienteRepository } from "../repositories/clienteRepository"


export class NotaFiscalService {
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()

    verificarExistencia( tabela: string, valor: any): number {
        const carroRepository = CarroRepository.getInstance()
        const vendedorRepository = VendedorRepository.getInstance()
        const clienteRepository = ClienteRepository.getInstance()

        switch(tabela){
            case "id_carro":
                return carroRepository.carroList.findIndex(carro => carro.id_carro === valor)
                break
            case "id_vendedor":

                break
            case "id_cliente":

                break


        }


        return 0
    }
    
    emiteNota(notaBody: any): NotaFiscal{
        const dataAtual: string = new Date().toISOString()
        const dataEntrada: string = new Date(notaBody.data_entrada).toISOString()

        if(!notaBody.numero_nota || !notaBody.data_emissao || !notaBody.valor_total || !notaBody.id_cliente || !notaBody.id_vendedor || !notaBody.id_carro){
            throw new Error("Dados obrigatórios faltantes!!! [Numero da nota, Data emissao, Valor total, ID Cliente, ID Vendedor, ID Carro")
        }
        if(!(notaBody.valor_total > 0)){
            throw new Error("Valor total deve ser maior que zero.")
        }
        if(dataEntrada > dataAtual){
            throw new Error("A data de emissao nao pode ser uma data futura, coloque a data real que a nota foi emitida.")
        }
        if(this.verificarExistencia("id_carro", notaBody.id_carro) === -1 && this.verificarExistencia("id_vendedor", notaBody.id_vendedor) === -1 && this.verificarExistencia("id_cliente", notaBody.id_carro) === -1){
            throw new Error("O ID Carro, ID Vendedor e ID Cliente devem já estar previamente cadastrados no sistema.")
        }





    }

}