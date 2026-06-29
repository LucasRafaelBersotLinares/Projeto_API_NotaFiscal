import { Request, Response } from "express";
import { VendedorService } from "../services/vendedorService";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class VendedorController {
    vendedorService: VendedorService;
    erroStatus: ErroStatusRepository;
    insereVendedor(req: Request, res: Response): Promise<void>;
    listaVendedores(req: Request, res: Response): Promise<void>;
    listaVendedorID(req: Request, res: Response): Promise<void>;
    atualizaVendedor(req: Request, res: Response): Promise<void>;
    deleteVendedor(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=vendedorController.d.ts.map