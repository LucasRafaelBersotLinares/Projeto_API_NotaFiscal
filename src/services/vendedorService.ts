import { Vendedor } from "../models/vendedor"
import { VendedorRepository } from "../repositories/vendedorRepository"

export class VendedorService {
    vendedorRepository: VendedorRepository = VendedorRepository.getInstance()

    insereVendedor(vendedorBody: any): Vendedor {
        if(!vendedorBody.nome || !vendedorBody.matricula || !vendedorBody.comissao_percentual){
            throw new Error("Dados obrigatórios faltantes!!! [Nome, Matricula, Comissao_percentual]")
        }
        if(this.vendedorRepository.matriculaRepetida(vendedorBody.cpf) === -1){
            return this.vendedorRepository.insereVendedor(vendedorBody)
        }
        throw new Error("Sistema ja possui um vendedor cadastrado nesta matricula")
    }

}