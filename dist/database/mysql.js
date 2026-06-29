"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executarComandoSQL = executarComandoSQL;
exports.inicializarBanco = inicializarBanco;
const mysql2_1 = __importDefault(require("mysql2"));
const clienteRepository_1 = require("../repositories/clienteRepository");
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const carroRepository_1 = require("../repositories/carroRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    database: 'sqlnotafiscal'
};
const mysqlConnection = mysql2_1.default.createConnection(dbConfig);
mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados :', err);
        throw err;
    }
    console.log('Conexao bem-sucedida com o banco de dados MySQL');
});
function executarComandoSQL(query, valores) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}
async function inicializarBanco() {
    console.log("Sincronizando schemas do banco de dados...");
    const schemas = [
        clienteRepository_1.ClienteRepository.getCreateTableQuery(),
        vendedorRepository_1.VendedorRepository.getCreateTableQuery(),
        carroRepository_1.CarroRepository.getCreateTableQuery(),
        estoqueRepository_1.EstoqueRepository.getCreateTableQuery()
    ];
    try {
        await executarComandoSQL(`USE ${dbConfig.database}`, []);
        console.log(`Conectado ao schema: ${dbConfig.database}`);
        for (const query of schemas) {
            await executarComandoSQL(query, []);
        }
        console.log("Todos os repositórios foram inicializados com sucesso.");
    }
    catch (err) {
        console.error("Erro crítico na sincronização dos repositórios:", err);
        process.exit(1);
    }
}
//# sourceMappingURL=mysql.js.map