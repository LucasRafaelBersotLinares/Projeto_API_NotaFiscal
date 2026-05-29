"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereEstoque = insereEstoque;
const estoqueService_1 = require("../services/estoqueService");
const estoqueService = new estoqueService_1.EstoqueService();
function insereEstoque(req, res) {
    try {
        const newEstoque = estoqueService.insereEstoque(req.body);
        res.status(201).json({
            message: "Estoque cadastrado com sucesso!!!",
            estoque: newEstoque
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//# sourceMappingURL=estoqueController.js.map