import { Request, Response } from "express";
import { CarroService } from "../services/carroService";
import { ErroStatusRepository } from "../repositories/erroStatusRepository";
export declare class CarroController {
    carroService: CarroService;
    erroStatus: ErroStatusRepository;
    insereCarro(req: Request, res: Response): Promise<void>;
    listaCarros(req: Request, res: Response): Promise<void>;
    listaCarroID(req: Request, res: Response): Promise<void>;
    listaCarroDisponivel(req: Request, res: Response): Promise<void>;
    atualizaCarro(req: Request, res: Response): Promise<void>;
    deleteCarro(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=carroController.d.ts.map