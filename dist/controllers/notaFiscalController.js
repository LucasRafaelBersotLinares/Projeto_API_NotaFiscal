"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emiteNota = emiteNota;
exports.listaNotas = listaNotas;
exports.listaNotaID = listaNotaID;
const notaFiscalService_1 = require("../services/notaFiscalService");
const notaService = new notaFiscalService_1.NotaFiscalService();
function emiteNota(req, res) {
    try {
        const newNota = notaService.emiteNota(req.body);
        res.status(201).json({
            message: "Nota emitida com sucesso!!!",
            cliente: newNota
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function listaNotas(req, res) {
    try {
        const notasList = notaService.listaNotas();
        res.status(200).json({
            message: "Lista das Notas Emitidas:",
            notasList
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function listaNotaID(req, res) {
    try {
        const notaID = notaService.listaNotaID(req.params.id);
        res.status(200).json({
            message: "Nota encontrada:",
            notaID
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//# sourceMappingURL=notaFiscalController.js.map