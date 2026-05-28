import express from "express"
import { insereCliente, listaClientes } from "./controllers/clienteController"

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

function serverOn(){
    console.log(`API está sendo executada no endereço: http:localhost:${PORT}`)
}

app.post("/clientes",insereCliente)
app.get("/clientes",listaClientes)
app.listen(PORT, serverOn)