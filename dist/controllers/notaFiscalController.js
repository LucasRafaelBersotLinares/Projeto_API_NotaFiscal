"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaController = void 0;
const notaFiscalService_1 = require("../services/notaFiscalService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
const notaService = new notaFiscalService_1.NotaFiscalService();
const erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
class NotaController {
    async emiteNota(req, res) {
        try {
            const newNota = await notaService.emiteNota(req.body);
            res.status(201).json(newNota);
        }
        catch (error) {
            res.status(erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaNotas(req, res) {
        try {
            const notasList = await notaService.listaNotas();
            res.status(200).json(notasList);
        }
        catch (error) {
            res.status(erroStatus.mostraErro()).json({ message: error.message });
        }
    }
    async listaNotaID(req, res) {
        try {
            const notaID = await notaService.listaNotaID(req.params.id);
            res.status(200).json(notaID);
        }
        catch (error) {
            res.status(erroStatus.mostraErro()).json({ message: error.message });
        }
    }
}
exports.NotaController = NotaController;
//# sourceMappingURL=notaFiscalController.js.map