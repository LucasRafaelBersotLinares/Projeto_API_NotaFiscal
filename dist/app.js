"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteController_1 = require("./controllers/clienteController");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
function serverOn() {
    console.log(`API está sendo executada no endereço: http:localhost:${PORT}`);
}
app.post("/clientes", clienteController_1.insereCliente);
app.get("/clientes", clienteController_1.listaClientes);
app.listen(PORT, serverOn);
//# sourceMappingURL=app.js.map