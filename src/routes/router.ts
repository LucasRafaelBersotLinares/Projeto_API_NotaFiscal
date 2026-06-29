import express, { Request, Response, Router } from "express"
import { ClienteController } from "../controllers/clienteController"
import { CarroController } from "../controllers/carroController"
import { EstoqueController } from "../controllers/estoqueController"
// import { NotaFiscalController } from "../controllers/notaFiscalController"
import { VendedorController } from "../controllers/vendedorController"

const router = Router();
const clienteController = new ClienteController();
const carroController = new CarroController();
const estoqueController = new EstoqueController();
// const notaFiscalController = new NotaFiscalController();
const vendedorController = new VendedorController();



router.post("/clientes",(req: Request, res: Response) => {clienteController.insereCliente(req,res)})
router.get("/clientes",(req: Request, res: Response) => {clienteController.listaClientes(req,res)})
router.get("/clientes/:id",(req: Request, res: Response) => {clienteController.listaClienteID(req,res)})
// router.get("/clientes/notas/:id",listaNotasCliente)
router.put("/clientes/:id",(req: Request, res: Response) => {clienteController.atualizaCliente(req,res)})
router.delete("/clientes/:id", (req: Request, res: Response) => {clienteController.deleteCliente(req,res)})

router.post("/vendedores",(req: Request, res: Response) => {vendedorController.insereVendedor(req,res)})
router.get("/vendedores",(req: Request, res: Response) => {vendedorController.listaVendedores(req,res)})
router.get("/vendedores/:id",(req: Request, res: Response) => {vendedorController.listaVendedorID(req,res)})
// router.get("/vendedores/notas/:id",listaNotasVendedor)
router.put("/vendedores/:id",(req: Request, res: Response) => {vendedorController.atualizaVendedor(req,res)})
router.delete("/vendedores/:id",(req: Request, res: Response) => {vendedorController.deleteVendedor(req,res)})

router.post("/carros",(req: Request, res: Response) => {carroController.insereCarro(req,res)})
router.get("/carros",(req: Request, res: Response) => {carroController.listaCarros(req,res)})
// router.get("/carros/disponiveis",listaCarroDisponiveis)
router.get("/carros/:id",(req: Request, res: Response) => {carroController.listaCarroID(req,res)})
router.put("/carros/:id",(req: Request, res: Response) => {carroController.atualizaCarro(req,res)})
router.delete("/carros/:id", (req: Request, res: Response) => {carroController.deleteCarro(req,res)})

router.post("/estoque",(req: Request, res: Response) => {estoqueController.insereEstoque(req,res)})
router.get("/estoque",(req: Request, res: Response) => {estoqueController.listaEstoque(req,res)})
// router.get("/estoque/carro/:id",(req: Request, res: Response) => {estoqueController.listaEstoqueCarroID(req,res)})
router.get("/estoque/:id",(req: Request, res: Response) => {estoqueController.listaEstoqueID(req,res)})
router.put("/estoque/:id",(req: Request, res: Response) => {estoqueController.atualizaEstoque(req,res)})
router.delete("/estoque/:id",(req: Request, res: Response) => {estoqueController.deleteEstoque(req,res)})

// router.post("/notas",emiteNota)
// router.get("/notas",listaNotas)
// router.get("/notas/:id",listaNotaID)

export default router 