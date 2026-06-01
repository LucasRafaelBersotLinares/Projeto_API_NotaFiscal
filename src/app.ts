import express from "express"
import { insereCliente, listaClientes, listaClienteID, atualizaCliente, deletaCliente, listaNotasCliente} from "./controllers/clienteController"
import { insereVendedor, listaVendedores, listaVendedorID, atualizaVendedor, deletaVendedor, listaNotasVendedor } from "./controllers/vendedorController"
import { insereCarro, listaCarros, listaCarroID, atualizaCarro, deletaCarro} from "./controllers/carroController"
import { insereEstoque, listaEstoque, listaEstoqueID, atualizaEstoque, listaEstoqueIDCarro, deletaEstoque } from "./controllers/estoqueController"
import { emiteNota, listaNotas, listaNotaID} from "./controllers/notaFiscalController"

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

function serverOn(){
    console.log(`API está sendo executada no endereço: http:localhost:${PORT}`)
}

app.post("/clientes",insereCliente)
app.get("/clientes",listaClientes)
app.get("/clientes/:id",listaClienteID)
app.get("/clientes/notas/:id",listaNotasCliente)
app.put("/clientes/:id",atualizaCliente)
app.delete("/clientes/:id", deletaCliente)

app.post("/vendedores",insereVendedor)
app.get("/vendedores",listaVendedores)
app.get("/vendedores/:id",listaVendedorID)
app.get("/vendedores/notas/:id",listaNotasVendedor)
app.put("/vendedores/:id",atualizaVendedor)
app.delete("/vendedores/:id", deletaVendedor)

app.post("/carros",insereCarro)
app.get("/carros",listaCarros)
app.get("/carros/:id",listaCarroID)
app.put("/carros/:id",atualizaCarro)
app.delete("/carros/:id", deletaCarro)

app.post("/estoque",insereEstoque)
app.get("/estoque",listaEstoque)
app.get("/estoque/:id",listaEstoqueID)
app.get("/estoque/carro/:id",listaEstoqueIDCarro)
app.put("/estoque/:id",atualizaEstoque)
app.delete("/estoque/:id",deletaEstoque)

app.post("/notas",emiteNota)
app.get("/notas",listaNotas)
app.get("/notas/:id",listaNotaID)
app.listen(PORT, serverOn)