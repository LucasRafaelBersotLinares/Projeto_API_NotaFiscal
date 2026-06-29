"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorController = void 0;
const vendedorService_1 = require("../services/vendedorService");
const erroStatusRepository_1 = require("../repositories/erroStatusRepository");
class VendedorController {
    vendedorService = new vendedorService_1.VendedorService();
    erroStatus = erroStatusRepository_1.ErroStatusRepository.getInstance();
    async insereVendedor(req, res) {
        try {
            const newVendedor = await this.vendedorService.insereVendedor(req.body);
            res.status(201).json(newVendedor);
        }
        catch (error) {
            res.status(this.erroStatus.mostraErro()).json({ message: error.message });
        }
    }
}
exports.VendedorController = VendedorController;
//# sourceMappingURL=vendedorController.js.map