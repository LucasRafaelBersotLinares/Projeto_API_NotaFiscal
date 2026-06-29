import { Carro } from "../models/carro"
import { CarroRepository } from "../repositories/carroRepository"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
import { EstoqueRepository } from "../repositories/estoqueRepository"
import { ErroStatusRepository } from "../repositories/erroStatusRepository"

export class CarroService {
    carroRepository: CarroRepository = CarroRepository.getInstance()
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()
    erroStatus: ErroStatusRepository = ErroStatusRepository.getInstance()


    insereCarro(carroBody: any): Carro{
        const anoAtual: Date = new Date()

        if(!carroBody.marca || !carroBody.modelo || !carroBody.ano || !carroBody.placa || !carroBody.preco || !carroBody.cor){
            this.erroStatus.insereErro(400)
            throw new Error("Dados obrigatórios faltantes!!! [Marca, Modelo, Ano, Placa, Preco, Cor].")
        }
        if(this.carroRepository.placaRepetida(carroBody.placa) === -1){
            if(carroBody.ano >= 1950 && carroBody.ano <= (anoAtual.getFullYear()+1)){
                if(carroBody.preco > 0){
                    return this.carroRepository.insereCarro(carroBody)
                }
                this.erroStatus.insereErro(400)
                throw new Error("O preço do carro deve ser maior que zero.")
            }
            this.erroStatus.insereErro(400)
            throw new Error("O ano do carro deve ser maior que 1950 ou um ano válido antes do próximo ano atual. (Ex: 2027 = (anoAtual: 2026) + (próximoAno: 1)= 2027)")
        }
        this.erroStatus.insereErro(409)
        throw new Error("Sistema já possuí um carro cadastrado com está placa.")
    }

    listaCarros(): Carro[] {
        if(this.carroRepository.listaCarros() === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Nenhum Carro cadastrado.")
        }
        return this.carroRepository.listaCarros()
    }

    listaCarroID(id: any): Carro | undefined {
        if(this.carroRepository.listaCarroID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Carro com este ID, não existe no sistema.")
        }
        return this.carroRepository.listaCarroID(Number(id))
    }

    listaCarroDisponivel(): Carro[] | undefined {
        const carroList = this.carroRepository.listaCarros()
        const carroDisponiveis = carroList.filter(carro => this.estoqueRepository.listaCarroDisponivel(Number(carro.id_carro))?.quantidade != 0)
        if(carroList.length === 0 || carroDisponiveis.length === 0){
            this.erroStatus.insereErro(404)
            throw new Error("Nenhum veiculo cadastrado")
        }
        return carroDisponiveis
    }

    atualizaCarro(id: any, carroBody: any): Carro | undefined {
        const anoAtual: Date = new Date()
        if(this.carroRepository.indexCarro(Number(id)) === -1){
            this.erroStatus.insereErro(404)
            throw new Error("Carro com este ID, não existe no sistema.")
        }

        const indexId = this.carroRepository.indexCarro(Number(id));
        const indexPlaca = this.carroRepository.placaRepetida(carroBody.cpf);
        if(indexPlaca !== -1 && indexPlaca !== indexId){
            this.erroStatus.insereErro(409)
            throw new Error("Não pode ter um vendedor com uma matrícula já cadastrada. Atualize com outra matrícula.")
        }

        if(!(carroBody.ano >= 1950 && carroBody.ano <= (anoAtual.getFullYear()+1))){
            this.erroStatus.insereErro(400)
            throw new Error("O ano do carro deve ser maior que 1950 ou um ano válido antes do próximo ano atual. (Ex: 2027 = (anoAtual: 2026) + (próximoAno: 1)= 2027)")
        }
        if(!(carroBody.preco > 0)){
            this.erroStatus.insereErro(400)
            throw new Error("O preço do carro deve ser maior que zero.") 
        }
        return this.carroRepository.atualizaCarro(Number(id),carroBody)
    }

    deletaCarro(id: any): Carro[] | undefined {
        if(this.carroRepository.listaCarroID(Number(id)) === undefined){
            this.erroStatus.insereErro(404)
            throw new Error("Carro com este ID, não está cadastrado no sistema.")
        }
        if(this.notaRepository.verificaNotaIDtabela(Number(id),"carro") != -1){
            this.erroStatus.insereErro(422)
            throw new Error("Carro não pode ser excluído por conta que tem nota emitida.")
        }
        if(this.estoqueRepository.listaEstoqueIDCarro(Number(id)) != undefined){
            this.erroStatus.insereErro(422)
            throw new Error("Carro não pode ser excluído por conta que tem estoque aberto.")
        }
        return this.carroRepository.deletaCarro(id)
    }
}