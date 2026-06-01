"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteController_1 = require("./controllers/clienteController");
const vendedorController_1 = require("./controllers/vendedorController");
const carroController_1 = require("./controllers/carroController");
const estoqueController_1 = require("./controllers/estoqueController");
const notaFiscalController_1 = require("./controllers/notaFiscalController");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
function serverOn() {
    console.log(`API está sendo executada no endereço: http:localhost:${PORT}`);
}
app.post("/clientes", clienteController_1.insereCliente);
app.get("/clientes", clienteController_1.listaClientes);
app.get("/clientes/:id", clienteController_1.listaClienteID);
app.put("/clientes/:id", clienteController_1.atualizaCliente);
app.post("/vendedores", vendedorController_1.insereVendedor);
app.get("/vendedores", vendedorController_1.listaVendedores);
app.get("/vendedores/:id", vendedorController_1.listaVendedorID);
app.put("/vendedores/:id", vendedorController_1.atualizaVendedor);
app.post("/carros", carroController_1.insereCarro);
app.get("/carros", carroController_1.listaCarros);
app.get("/carros/:id", carroController_1.listaCarroID);
app.put("/carros/:id", carroController_1.atualizaCarro);
app.post("/estoque", estoqueController_1.insereEstoque);
app.get("/estoque", estoqueController_1.listaEstoque);
app.get("/estoque/:id", estoqueController_1.listaEstoqueID);
app.get("/estoque/carro/:id", estoqueController_1.listaEstoqueIDCarro);
app.put("/estoque/:id", estoqueController_1.atualizaEstoque);
app.delete("/estoque/:id", estoqueController_1.deletaEstoque);
app.post("/notas", notaFiscalController_1.emiteNota);
app.get("/notas", notaFiscalController_1.listaNotas);
app.get("/notas/:id", notaFiscalController_1.listaNotaIDporTabela);
app.listen(PORT, serverOn);
//# sourceMappingURL=app.js.map