import { executarComandoSQL } from "../database/mysql"
import { Estoque } from "../models/estoque"

export class EstoqueRepository {
    private static instance: EstoqueRepository
    private constructor() {}

    public static getInstance(): EstoqueRepository {
        if(!this.instance){
            this.instance = new EstoqueRepository()
        }
        return this.instance
    }

     static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS Estoques (
            id_estoque INT AUTO_INCREMENT PRIMARY KEY,
            id_carro INT NOT NULL,
            quantidade INT NOT NULL,
            localizacao_patio VARCHAR(255) NOT NULL,
            data_entrada DATE,
            FOREIGN KEY (id_carro) REFERENCES Carros(id_carro)
            );
        `;
    }


    async insereEstoque(estoque: Estoque): Promise<Estoque> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Estoques (id_carro, quantidade, localizacao_patio, data_entrada) VALUES (?, ?, ?, ?)",
            [estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada]
        );

        const idGerado = resultado.insertId;

        const newEstoque = new Estoque(
            idGerado,
            estoque.id_carro,
            estoque.quantidade,
            estoque.localizacao_patio,
            estoque.data_entrada
        );

        console.log("Estoque inserido com sucesso:", newEstoque);
        return newEstoque;
    }

    async listaEstoques(): Promise<Estoque[]> {
        const linhas = await executarComandoSQL("SELECT * FROM Estoques", []);
        const estoques: Estoque[] = linhas.map((linha: any) => {
            return new Estoque(linha.id_estoque,linha.id_carro, linha.quantidade, linha.localizacao_patio, linha.data_entrada)
        })
        return estoques
    }

    async listaEstoqueID(id: any): Promise<Estoque | undefined>{
        const linhas = await executarComandoSQL("SELECT * FROM Estoques WHERE id_estoque = ?", [id])

        if (linhas.length === 0) {
            return undefined;
        }

        const linha = linhas[0];

        return new Estoque(
            linha.id_estoque,
            linha.id_carro,
            linha.quantidade,
            linha.localizacao_patio,
            linha.data_entrada
        );
    }

    async atualizaEstoque(id: any, estoqueBody: any): Promise<Estoque> {
        await executarComandoSQL(
            `UPDATE Estoques
            SET 
                quantidade = ?,
                localizacao_patio = ?
            WHERE id_estoque = ?;`,
            [estoqueBody.quantidade, estoqueBody.localizacao_patio, id]
        );
        return await executarComandoSQL("SELECT * FROM Estoques WHERE id_estoque = ?", [id])
    }

    async carroDuplicado(id: any): Promise<Estoque | undefined>{
        const linhas = await executarComandoSQL("SELECT * FROM Estoques WHERE id_carro = ?", [id])

        if (linhas.length === 0) {
            return undefined;
        }

        const linha = linhas[0];

        return new Estoque(
            linha.id_estoque,
            linha.id_carro,
            linha.quantidade,
            linha.localizacao_patio,
            linha.data_entrada
        );
    }

    async deleteEstoque(id: any): Promise<Estoque | undefined> {
        const estoque = await this.listaEstoqueID(id)
        await executarComandoSQL("DELETE FROM Estoques WHERE id_estoque = ?", [id])
        return estoque
    }


    async listaEstoqueCarroID(id: any): Promise<Estoque | undefined>{
        const linhas = await executarComandoSQL("SELECT * FROM Estoques WHERE id_carro = ?", [id])
        
        if (linhas.length === 0) {
            return undefined;
        }

        const linha = linhas[0];

        return new Estoque(
            linha.id_estoque,
            linha.id_carro,
            linha.quantidade,
            linha.localizacao_patio,
            linha.data_entrada
        );
    }


    // diminuirEstoque(id: number){
    //     let estoqueIndex: number = this.estoqueList.findIndex(estoque => estoque.id_estoque === id)
    //     this.estoqueList[estoqueIndex]!.quantidade -= 1
    // }

}