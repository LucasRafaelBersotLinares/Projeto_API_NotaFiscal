import { Cliente } from "../models/cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
import { NotaFiscal } from "../models/notaFiscal"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"
export class ClienteService {
    clienteRepository: ClienteRepository = ClienteRepository.getInstance()
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    erroStatus: ErroStatusRepository = ErroStatusRepository.getInstance()

    async insereCliente(clienteBody: any): Promise<Cliente> {
        if(!clienteBody.nome || !clienteBody.cpf || !clienteBody.telefone){
            this.erroStatus.insereErro(400)
            throw new Error("Dados obrigatórios faltantes!!! [Nome, CPF, Telefone].")
        }
        
        if(await this.clienteRepository.cpfDuplicado(clienteBody.cpf) === undefined){
            const novoCliente = new Cliente(null, clienteBody.nome,clienteBody.cpf,clienteBody.telefone,clienteBody.email,clienteBody.cidade)
            return await this.clienteRepository.insereCliente(novoCliente)
        }else{
            this.erroStatus.insereErro(409)
            throw new Error("Cliente ja possui este CPF")
        }
    }

    async listaClientes(): Promise<Cliente[]> {
        if(await this.clienteRepository.listaClientes() === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Nenhum Cliente cadastrado.")
        }
        return this.clienteRepository.listaClientes()
    }

    async listaClienteID(id: any): Promise<Cliente | undefined>{
        if(await this.clienteRepository.listaClienteID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Cliente com este ID, não existe no sistema.")
        }
        return this.clienteRepository.listaClienteID(Number(id))
    }   

    async atualizaCliente(id: any, clienteBody: any): Promise<Cliente | undefined>{
        if(await this.clienteRepository.listaClienteID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Cliente com este ID, não existe no sistema.")
        }

        return this.clienteRepository.atualizaCliente(Number(id),clienteBody)
    }

    async deletaCliente(id: any): Promise<Cliente | undefined>{
        if(await this.clienteRepository.listaClienteID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Cliente com este ID, não está cadastrado no sistema.")
        }
        if(await this.notaRepository.verificaCliente(Number(id)) != undefined){
            this.erroStatus.insereErro(422)
            throw new Error("Cliente não pode ser excluído por conta que tem nota emitida.")
        }
        return this.clienteRepository.deleteCliente(id)
    }

    async listaNotasCliente(id: any): Promise<NotaFiscal[] | undefined >{
        if(await this.notaRepository.listaNotasCliente(id) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Cliente não possuí notas emitidas no sistema.")
        }
        return this.notaRepository.listaNotasCliente(id)
    }
}