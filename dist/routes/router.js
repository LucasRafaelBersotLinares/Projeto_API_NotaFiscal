"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
const carroController_1 = require("../controllers/carroController");
const estoqueController_1 = require("../controllers/estoqueController");
// import { NotaFiscalController } from "../controllers/notaFiscalController"
const vendedorController_1 = require("../controllers/vendedorController");
const router = (0, express_1.Router)();
const clienteController = new clienteController_1.ClienteController();
const carroController = new carroController_1.CarroController();
const estoqueController = new estoqueController_1.EstoqueController();
// const notaFiscalController = new NotaFiscalController();
const vendedorController = new vendedorController_1.VendedorController();
router.post("/clientes", (req, res) => { clienteController.insereCliente(req, res); });
router.get("/clientes", (req, res) => { clienteController.listaClientes(req, res); });
router.get("/clientes/:id", (req, res) => { clienteController.listaClienteID(req, res); });
// router.get("/clientes/notas/:id",listaNotasCliente)
router.put("/clientes/:id", (req, res) => { clienteController.atualizaCliente(req, res); });
router.delete("/clientes/:id", (req, res) => { clienteController.deleteCliente(req, res); });
router.post("/vendedores", (req, res) => { vendedorController.insereVendedor(req, res); });
router.get("/vendedores", (req, res) => { vendedorController.listaVendedores(req, res); });
router.get("/vendedores/:id", (req, res) => { vendedorController.listaVendedorID(req, res); });
// router.get("/vendedores/notas/:id",listaNotasVendedor)
router.put("/vendedores/:id", (req, res) => { vendedorController.atualizaVendedor(req, res); });
router.delete("/vendedores/:id", (req, res) => { vendedorController.deleteVendedor(req, res); });
router.post("/carros", (req, res) => { carroController.insereCarro(req, res); });
router.get("/carros", (req, res) => { carroController.listaCarros(req, res); });
// router.get("/carros/disponiveis",listaCarroDisponiveis)
router.get("/carros/:id", (req, res) => { carroController.listaCarroID(req, res); });
router.put("/carros/:id", (req, res) => { carroController.atualizaCarro(req, res); });
router.delete("/carros/:id", (req, res) => { carroController.deleteCarro(req, res); });
router.post("/estoque", (req, res) => { estoqueController.insereEstoque(req, res); });
router.get("/estoque", (req, res) => { estoqueController.listaEstoque(req, res); });
router.get("/estoque/carro/:id", (req, res) => { estoqueController.listaEstoqueCarroID(req, res); });
router.get("/estoque/:id", (req, res) => { estoqueController.listaEstoqueID(req, res); });
router.put("/estoque/:id", (req, res) => { estoqueController.atualizaEstoque(req, res); });
router.delete("/estoque/:id", (req, res) => { estoqueController.deleteEstoque(req, res); });
// router.post("/notas",emiteNota)
// router.get("/notas",listaNotas)
// router.get("/notas/:id",listaNotaID)
exports.default = router;
//# sourceMappingURL=router.js.map