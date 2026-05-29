import { Estoque } from "../models/estoque"
import { EstoqueRepository } from "../repositories/estoqueRepository"

export class EstoqueService {
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance()




}