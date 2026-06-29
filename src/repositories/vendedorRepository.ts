import { executarComandoSQL } from "../database/mysql"
import { Vendedor } from "../models/vendedor"

export class VendedorRepository {
    private static instance: VendedorRepository
    private constructor() {}

    public static getInstance(): VendedorRepository {
        if(!this.instance){
            this.instance = new VendedorRepository()
        }
        return this.instance
    }

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS Vendedores (
            id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            matricula VARCHAR(255) NOT NULL,
            comissao_percentual INT NOT NULL
            );
        `;
    }
    
    async matriculaRepetida(matricula: string): Promise<Vendedor | undefined> {
        const linhas = await executarComandoSQL(
            "SELECT * FROM Vendedores WHERE matricula = ?",
            [matricula]
        );

        if (linhas.length === 0) {
            return undefined;
        }

        const linha = linhas[0];

        return new Vendedor(
            linha.id_vendedor,
            linha.nome,
            linha.matricula,
            linha.comissao_percentual,
        );
    } 

    async insereVendedor(vendedor: Vendedor): Promise<Vendedor> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Vendedores (nome, matricula, comissao_percentual) VALUES (?, ?, ?)",
            [vendedor.nome, vendedor.matricula, vendedor.comissao_percentual]
        );

        const idGerado = resultado.insertId;

        const newCliente = new Vendedor(
            idGerado,
            vendedor.nome,
            vendedor.matricula,
            vendedor.comissao_percentual
        );

        console.log("Cliente inserido com sucesso:", newCliente);
        return newCliente;
    }

    // matriculaRepetida(matricula: string): number{
    //     return this.vendedorList.findIndex(vendedor => vendedor.matricula === matricula)
    // }

    // indexVendedor(id: any){
    //     return this.vendedorList.findIndex((vendedor => vendedor.id_vendedor === id))
    // }

    async listaVendedores(): Promise<Vendedor[]> {
        const linhas = await executarComandoSQL("SELECT * FROM Vendedores", []);
        const vendedores: Vendedor[] = linhas.map((linha: any) => {
            return new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, linha.comissao_percentual)
        })
        return vendedores
    }

    async listaVendedorID(id: any): Promise<Vendedor | undefined>{
        const linhas = await executarComandoSQL("SELECT * FROM Vendedores WHERE id_vendedor = ?", [id])
        const vendedor: Vendedor = linhas.map((linha: any) => {
            return new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, linha.comissao_percentual)
        })
        return vendedor
    }

    async atualizaVendedor(id: any, vendedorBody: any): Promise<Vendedor> {
        await executarComandoSQL(
            `UPDATE Vendedores
            SET 
                nome = ?,
                matricula = ?,
                comissao_percentual = ?
            WHERE id_vendedor = ?;`,
            [vendedorBody.nome, vendedorBody.matricula, vendedorBody.comissao_percentual, id]
        );
        return await executarComandoSQL("SELECT * FROM Vendedores WHERE id_vendedor = ?", [id])
    }

    async deleteVendedor(id: any): Promise<Vendedor | undefined> {
        const vendedor = await this.listaVendedorID(id)
        await executarComandoSQL("DELETE FROM Vendedores WHERE id_vendedor = ?", [id])
        return vendedor
    }
}