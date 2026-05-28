import express from "express"
import { insereCliente, listaClientes, listaClienteID, atualizaCliente} from "./controllers/clienteController"
import { insereVendedor } from "./controllers/vendedorController"

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
app.listen(PORT, serverOn)