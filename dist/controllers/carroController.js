"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroController = void 0;
const carroService_1 = require("../services/carroService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class CarroController {
    carroService = new carroService_1.CarroService();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async insereCarro(req, res) {
        try {
            const newCarro = await this.carroService.insereCarro(req.body);
            res.status(201).json(newCarro);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaCarros(req, res) {
        try {
            const carroList = await this.carroService.listaCarros();
            res.status(200).json(carroList);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaCarroID(req, res) {
        try {
            const carroID = await this.carroService.listaCarroID(req.params.id);
            res.status(200).json(carroID);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    // listaCarroDisponiveis(req: Request, res: Response){
    //     try{
    //         const carrosDisponiveis: any = carroService.listaCarroDisponivel()
    //         res.status(200).json(carrosDisponiveis)
    //     } catch(error: any){
    //         res.status(erroStatus.mostraErro()).json({message: error.message})
    //     }
    // }
    async atualizaCarro(req, res) {
        try {
            const carroAtualizado = await this.carroService.atualizaCarro(req.params.id, req.body);
            res.status(200).json(carroAtualizado);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async deleteCarro(req, res) {
        try {
            const carroDelete = await this.carroService.deleteCarro(req.params.id);
            res.status(200).json(carroDelete);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
}
exports.CarroController = CarroController;
//# sourceMappingURL=carroController.js.map