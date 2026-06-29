import { executarComandoSQL } from "../database/mysql"
import { NotaFiscal } from "../models/notaFiscal"
export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository
    private constructor() {}

    public static getInstance(): NotaFiscalRepository {
        if(!this.instance){
            this.instance = new NotaFiscalRepository()
        }
        return this.instance
    }

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS Notas (
            id_nota INT AUTO_INCREMENT PRIMARY KEY,
            numero_nota VARCHAR(255) NOT NULL,
            data_emissao DATE NOT NULL,
            valor_total INT NOT NULL,
            id_cliente INT NOT NULL,
            id_vendedor INT NOT NULL,
            id_carro INT NOT NULL,

            FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
            FOREIGN KEY (id_vendedor) REFERENCES Vendedores(id_vendedor),
            FOREIGN KEY (id_carro) REFERENCES Carros(id_carro)
            );
        `;
    }

    async emiteNota(nota: any): Promise<NotaFiscal> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Notas (numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro) VALUES (?, ?, ?, ?, ?, ?)",
            [nota.numero_nota, nota.data_emissao, nota.valor_total, nota.id_cliente, nota.id_vendedor, nota.id_carro]
        );

        const idGerado = resultado.insertId;

        const newNota = new NotaFiscal(
            idGerado,
            nota.numero_nota,
            nota.data_emissao,
            nota.valor_total,
            nota.id_cliente,
            nota.id_vendedor,
            nota.id_carro
        );

        console.log("Nota emitida com sucesso:", newNota);
        return newNota;
    }

    async listaNotas(): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL("SELECT * FROM Notas", []);
        const notas: NotaFiscal[] = linhas.map((linha: any) => {
            return new NotaFiscal(linha.id_nota, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.id_cliente, linha.id_vendedor, linha.id_carro)
        })
        return notas
    }

    async notaDuplicada(nota: string): Promise<NotaFiscal | undefined> {
        const linhas = await executarComandoSQL(
            "SELECT * FROM Notas WHERE numero_nota = ?",
            [nota]
        );

        if (linhas.length === 0) {
            return undefined;
        }

        const linha = linhas[0];

        return new NotaFiscal(
            linha.id_nota,
            linha.numero_nota,
            linha.data_emissao,
            linha.valor_total,
            linha.id_cliente,
            linha.id_vendedor,
            linha.id_carro
        );
    }   

    async listaNotaID(id: number): Promise<NotaFiscal | undefined> {
        const linhas = await executarComandoSQL(
            "SELECT * FROM Notas WHERE id_nota = ?",
            [id]
        );

        if (linhas.length === 0) {
            return undefined;
        }

        const linha = linhas[0];

        return new NotaFiscal(
            linha.id_nota,
            linha.numero_nota,
            linha.data_emissao,
            linha.valor_total,
            linha.id_cliente,
            linha.id_vendedor,
            linha.id_carro
        );
    }

}