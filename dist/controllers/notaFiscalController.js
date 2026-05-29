"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emiteNota = emiteNota;
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
//# sourceMappingURL=notaFiscalController.js.map