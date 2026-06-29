import { Request, Response } from "express";
import { VendedorService } from "../services/vendedorService";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class VendedorController {
    vendedorService: VendedorService;
    erroStatus: ErroStatusRepository;
    insereVendedor(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=vendedorController.d.ts.map