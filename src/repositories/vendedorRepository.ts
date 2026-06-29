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

}