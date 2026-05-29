import express from "express"
import { insereCliente, listaClientes, listaClienteID, atualizaCliente} from "./controllers/clienteController"
import { insereVendedor, listaVendedores, listaVendedorID, atualizaVendedor } from "./controllers/vendedorController"
import { insereCarro, listaCarros, listaCarroID, atualizaCarro} from "./controllers/carroController"
import { insereEstoque, listaEstoque, listaEstoqueID, atualizaEstoque } from "./controllers/estoqueController"

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

function serverOn(){
    console.log(`API está sendo executada no endereço: http:localhost:${PORT}`)
}

app.post("/clientes",insereCliente)
app.get("/clientes",listaClientes)
app.get("/clientes/:id",listaClienteID)
app.put("/clientes/:id",atualizaCliente)

app.post("/vendedores",insereVendedor)
app.get("/vendedores",listaVendedores)
app.get("/vendedores/:id",listaVendedorID)
app.put("/vendedores/:id",atualizaVendedor)

app.post("/carros",insereCarro)
app.get("/carros",listaCarros)
app.get("/carros/:id",listaCarroID)
app.put("/carros/:id",atualizaCarro)

app.post("/estoque",insereEstoque)
app.get("/estoque",listaEstoque)
app.get("/estoque/:id",listaEstoqueID)
app.put("/estoque/:id",atualizaEstoque)
app.listen(PORT, serverOn)