import { Cliente } from "../models/cliente"
import { clienteRepository } from "../repositories/clienteRepository"
export class clienteService {
    clienteRepository: clienteRepository = clienteRepository.getInstance()

    

}