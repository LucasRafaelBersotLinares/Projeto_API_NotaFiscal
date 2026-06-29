"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
// import { CarroController } from "./controllers/carroController"
// import { EstoqueController } from "./controllers/estoqueController"
// import { NotaFiscalController } from "./controllers/notaFiscalController"
// import { VendedorController } from "./controllers/vendedorController"
const router = (0, express_1.Router)();
const clienteController = new clienteController_1.ClienteController();
// const carroController = new CarroController();
// const estoqueController = new EstoqueController();
// const notaFiscalController = new NotaFiscalController();
// const vendedorController = new VendedorController();
router.post("/clientes", (req, res) => { clienteController.insereCliente(req, res); });
router.get("/clientes", (req, res) => { clienteController.listaClientes(req, res); });
router.get("/clientes/:id", (req, res) => { clienteController.listaClienteID(req, res); });
// router.get("/clientes/notas/:id",listaNotasCliente)
router.put("/clientes/:id", (req, res) => { clienteController.atualizaCliente(req, res); });
// router.delete("/clientes/:id", deletaCliente)
// router.post("/vendedores",insereVendedor)
// router.get("/vendedores",listaVendedores)
// router.get("/vendedores/:id",listaVendedorID)
// router.get("/vendedores/notas/:id",listaNotasVendedor)
// router.put("/vendedores/:id",atualizaVendedor)
// router.delete("/vendedores/:id", deletaVendedor)
// router.post("/carros",insereCarro)
// router.get("/carros",listaCarros)
// router.get("/carros/disponiveis",listaCarroDisponiveis)
// router.get("/carros/:id",listaCarroID)
// router.put("/carros/:id",atualizaCarro)
// router.delete("/carros/:id", deletaCarro)
// router.post("/estoque",insereEstoque)
// router.get("/estoque",listaEstoque)
// router.get("/estoque/:id",listaEstoqueID)
// router.get("/estoque/carro/:id",listaEstoqueIDCarro)
// router.put("/estoque/:id",atualizaEstoque)
// router.delete("/estoque/:id",deletaEstoque)
// router.post("/notas",emiteNota)
// router.get("/notas",listaNotas)
// router.get("/notas/:id",listaNotaID)
exports.default = router;
//# sourceMappingURL=router.js.map