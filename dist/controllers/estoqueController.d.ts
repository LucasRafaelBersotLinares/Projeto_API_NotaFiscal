import { Request, Response } from "express";
import { EstoqueService } from "../services/estoqueService";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class EstoqueController {
    estoqueService: EstoqueService;
    erroStatus: ErroStatusRepository;
    insereEstoque(req: Request, res: Response): Promise<void>;
    listaEstoque(req: Request, res: Response): Promise<void>;
    listaEstoqueID(req: Request, res: Response): Promise<void>;
    atualizaEstoque(req: Request, res: Response): Promise<void>;
    deleteEstoque(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=estoqueController.d.ts.map