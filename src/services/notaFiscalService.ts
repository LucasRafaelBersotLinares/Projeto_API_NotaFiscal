import { NotaFiscal } from "../models/notaFiscal"
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository"
export class NotaFiscalService {
    notaRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance()


}