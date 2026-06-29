import { Request, Response } from "express";
import { ClienteService } from "../services/clienteService";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class ClienteController {
    clienteService: ClienteService;
    erroStatus: ErroStatusRepository;
    insereCliente(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=clienteController.d.ts.map