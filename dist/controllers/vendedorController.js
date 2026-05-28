"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insereVendedor = insereVendedor;
const vendedorService_1 = require("../services/vendedorService");
const vendedorService = new vendedorService_1.VendedorService();
function insereVendedor(req, res) {
    try {
        const newVendedor = vendedorService.insereVendedor(req.body);
        res.status(201).json({
            message: "Vendedor cadastrado com sucesso!!!",
            vendedor: newVendedor
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//# sourceMappingURL=vendedorController.js.map