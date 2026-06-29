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
        const novoCliente = new Cliente(null, clienteBody.nome,clienteBody.cpf,clienteBody.telefone,clienteBody.email,clienteBody.cidade)
    
        return this.clienteRepository.insereCliente(novoCliente)
    }

    async listaClientes(): Promise<Cliente[]> {
        if(await this.clienteRepository.listaClientes() === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Nenhum Cliente cadastrado.")
        }
        return this.clienteRepository.listaClientes()
    }

//     listaClienteID(id: any): Cliente | undefined {
//         if(this.clienteRepository.listaClienteID(Number(id)) === undefined){
//             this.erroStatus.insereErro(404)
//             throw new Error("Cliente com este ID, não existe no sistema.")
//         }
//         return this.clienteRepository.listaClienteID(Number(id))
//     }   

//     atualizaCliente(id: any, clienteBody: any): Cliente | undefined {
//         if(this.clienteRepository.indexCliente(Number(id)) === -1){
//             this.erroStatus.insereErro(404)
//             throw new Error("Cliente com este ID, não existe no sistema.")
//         }

//         const indexId = this.clienteRepository.indexCliente(Number(id));
//         const indexCPF = this.clienteRepository.cpfRepetido(clienteBody.cpf);
//         if(indexCPF !== -1 && indexCPF !== indexId){
//             this.erroStatus.insereErro(409)
//             throw new Error("Não pode ter um vendedor com uma matrícula já cadastrada. Atualize com outra matrícula.")
//         }

//         return this.clienteRepository.atualizaCliente(Number(id),clienteBody)
//     }

//     deletaCliente(id: any): Cliente[] | undefined {
//         if(this.clienteRepository.listaClienteID(Number(id)) === undefined){
//             this.erroStatus.insereErro(404)
//             throw new Error("Cliente com este ID, não está cadastrado no sistema.")
//         }
//         if(this.notaRepository.verificaNotaIDtabela(Number(id),"cliente") != -1){
//             this.erroStatus.insereErro(422)
//             throw new Error("Cliente não pode ser excluído por conta que tem nota emitida.")
//         }
//         return this.clienteRepository.deletaCliente(id)
//     }

//     listaNotasCliente(id: any): NotaFiscal[] | undefined {
//         if(this.notaRepository.listaNotasporTabela(id,"cliente")!.length === 0){
//             this.erroStatus.insereErro(404)
//             throw new Error("Cliente não possuí notas emitidas no sistema.")
//         }
//         return this.notaRepository.listaNotasporTabela(id,"cliente")
//     }
}