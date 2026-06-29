import { Vendedor } from "../models/vendedor"
import { VendedorRepository } from "../repositories/vendedorRepository"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
import { NotaFiscal } from "../models/notaFiscal"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

export class VendedorService {
    vendedorRepository: VendedorRepository = VendedorRepository.getInstance()
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    erroStatus: ErroStatusRepository = ErroStatusRepository.getInstance()

    async insereVendedor(vendedorBody: any): Promise<Vendedor> {
        if(!vendedorBody.nome || !vendedorBody.matricula || vendedorBody.comissao_percentual === undefined){
            this.erroStatus.insereErro(400)
            throw new Error("Dados obrigatórios faltantes!!! [Nome, Matricula, Comissao_percentual]")
        }
        if(await this.vendedorRepository.matriculaRepetida(vendedorBody.matricula) === undefined){
            if(vendedorBody.comissao_percentual >= 0 && vendedorBody.comissao_percentual <= 30){
                return this.vendedorRepository.insereVendedor(vendedorBody)
            }
            this.erroStatus.insereErro(400)
            throw new Error("A comissão percentual tem que ser um valor entre zero a trinta.")
        }
        this.erroStatus.insereErro(409)
        throw new Error("O sistema já possuí um vendedor cadastrado com está matricula.")
    }

    async listaVendedores(): Promise<Vendedor[]> {
        if(await this.vendedorRepository.listaVendedores() === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Nenhum Vendedor cadastrado.")
        }
        return this.vendedorRepository.listaVendedores()
    }

    async listaVendedorID(id: any): Promise<Vendedor | undefined>{
        if(await this.vendedorRepository.listaVendedorID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Vendedor com este ID, não existe no sistema.")
        }
        return this.vendedorRepository.listaVendedorID(Number(id))
    } 

    async atualizaVendedor(id: any, vendedorBody: any): Promise<Vendedor | undefined>{
        if(await this.vendedorRepository.listaVendedorID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Vendedor com este ID, não existe no sistema.")
        }

        if(!(vendedorBody.comissao_percentual >= 0 && vendedorBody.comissao_percentual <= 30)){
            this.erroStatus.insereErro(400)
            throw new Error("A comissão percentual tem que ser um valor entre 0 a 30.")
        }

        return this.vendedorRepository.atualizaVendedor(Number(id),vendedorBody)
    }

    // deletaVendedor(id: any): Vendedor[] | undefined {
    //     if(this.vendedorRepository.listaVendedorID(Number(id)) === undefined){
    //         this.erroStatus.insereErro(404)
    //         throw new Error("Vendedor cadastrado com este ID, não existe no sistema.")
    //     }
    //     if(this.notaRepository.verificaNotaIDtabela(Number(id),"vendedor") != -1){
    //         this.erroStatus.insereErro(422)
    //         throw new Error("Vendedor não pode ser excluído por conta que tem nota emitida.")
    //     }
    //     return this.vendedorRepository.deletaVendedor(id)
    // }

    async deleteVendedor(id: any): Promise<Vendedor | undefined>{
        if(await this.vendedorRepository.listaVendedorID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Vendedor com este ID, não está cadastrado no sistema.")
        }

        if(await this.notaRepository.verificaVendedor(Number(id)) != undefined){
            this.erroStatus.insereErro(422)
            throw new Error("Vendedor não pode ser excluído por conta que tem nota emitida.")
        }

        return this.vendedorRepository.deleteVendedor(id)
    }

    async listaNotasVendedor(id: any): Promise<NotaFiscal[] | undefined >{
        if(await this.notaRepository.listaNotasVendedor(id) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Vendedor não possuí notas emitidas no sistema.")
        }
        return this.notaRepository.listaNotasVendedor(id)
    }

}