import { Vendedor } from "../models/vendedor"
import { VendedorRepository } from "../repositories/vendedorRepository"

export class VendedorService {
    vendedorRepository: VendedorRepository = VendedorRepository.getInstance()


}