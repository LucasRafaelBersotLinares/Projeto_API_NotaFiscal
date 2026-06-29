"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emiteNota = emiteNota;
exports.listaNotas = listaNotas;
exports.listaNotaID = listaNotaID;
const notaFiscalService_1 = require("../services/notaFiscalService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
const notaService = new notaFiscalService_1.NotaFiscalService();
const erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
function emiteNota(req, res) {
    try {
        const newNota = notaService.emiteNota(req.body);
        res.status(201).json(newNota);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaNotas(req, res) {
    try {
        const notasList = notaService.listaNotas();
        res.status(200).json(notasList);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
function listaNotaID(req, res) {
    try {
        const notaID = notaService.listaNotaID(req.params.id);
        res.status(200).json(notaID);
    }
    catch (error) {
        res.status(erroStatus.mostraErro()).json({ message: error.message });
    }
}
//# sourceMappingURL=notaFiscalController.js.map