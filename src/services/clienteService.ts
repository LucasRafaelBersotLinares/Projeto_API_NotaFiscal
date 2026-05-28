import { Cliente } from "../models/cliente"
import { ClienteRepository } from "../repositories/clienteRepository"
export class ClienteService {
    clienteRepository: ClienteRepository = ClienteRepository.getInstance()



}