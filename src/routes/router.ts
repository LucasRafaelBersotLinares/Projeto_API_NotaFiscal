import express, { Request, Response, Router } from "express"
import { ClienteController } from "../controllers/clienteController"
// import { CarroController } from "../controllers/carroController"
// import { EstoqueController } from "../controllers/estoqueController"
// import { NotaFiscalController } from "../controllers/notaFiscalController"
import { VendedorController } from "../controllers/vendedorController"

const router = Router();
const clienteController = new ClienteController();
// const carroController = new CarroController();
// const estoqueController = new EstoqueController();
// const notaFiscalController = new NotaFiscalController();
const vendedorController = new VendedorController();



router.post("/clientes",(req: Request, res: Response) => {clienteController.insereCliente(req,res)})
router.get("/clientes",(req: Request, res: Response) => {clienteController.listaClientes(req,res)})
router.get("/clientes/:id",(req: Request, res: Response) => {clienteController.listaClienteID(req,res)})
// router.get("/clientes/notas/:id",listaNotasCliente)
router.put("/clientes/:id",(req: Request, res: Response) => {clienteController.atualizaCliente(req,res)})
router.delete("/clientes/:id", (req: Request, res: Response) => {clienteController.deleteCliente(req,res)})

router.post("/vendedores",(req: Request, res: Response) => {vendedorController.insereVendedor(req,res)})
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

export default router 