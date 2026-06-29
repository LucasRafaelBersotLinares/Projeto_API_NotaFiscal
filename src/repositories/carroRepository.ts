import { executarComandoSQL } from "../database/mysql"
import { Carro } from "../models/carro"

export class CarroRepository {
    private static instance: CarroRepository
    private constructor() {}

    public static getInstance(): CarroRepository {
        if(!this.instance){
            this.instance = new CarroRepository()
        }
        return this.instance
    }

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS Carros (
            id_carro INT AUTO_INCREMENT PRIMARY KEY,
            marca VARCHAR(255) NOT NULL,
            modelo VARCHAR(255) NOT NULL,
            ano INT (255) NOT NULL,
            placa VARCHAR(255) NOT NULL,
            preco INT (255) NOT NULL,
            cor VARCHAR(255) NOT NULL
            );
        `;
    }

    async insereCarro(carro: Carro): Promise<Carro> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Carros (marca, modelo, ano, placa, preco, cor) VALUES (?, ?, ?, ?, ?, ?)",
            [carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor]
        );

        const idGerado = resultado.insertId;

        const newCarro = new Carro(
            idGerado,
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.preco,
            carro.cor
        );

        console.log("Carro inserido com sucesso:", newCarro);
        return newCarro;
    }

    async listaCarros(): Promise<Carro[]> {
        const linhas = await executarComandoSQL("SELECT * FROM Carros", []);
        const carros: Carro[] = linhas.map((linha: any) => {
            return new Carro(linha.id_carro, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor)
        })
        return carros
    }

    async listaCarroID(id: any): Promise<Carro | undefined>{
        const linhas = await executarComandoSQL("SELECT * FROM Carros WHERE id_carro = ?", [id])
        const carro: Carro = linhas.map((linha: any) => {
            return new Carro(linha.id_carro, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor)
        })
        return carro
    }


    async atualizaCarro(id: any, carroBody: any): Promise<Carro> {
        await executarComandoSQL(
            `UPDATE Carros
            SET 
                marca = ?,
                modelo = ?,
                ano = ?,
                placa = ?,
                preco = ?,
                cor = ?
            WHERE id_carro = ?;`,
            [carroBody.marca, carroBody.modelo, carroBody.ano, carroBody.placa, carroBody.preco,carroBody.cor, id]
        );
        return await executarComandoSQL("SELECT * FROM Carros WHERE id_carro = ?", [id])
    }

    async deleteCarro(id: any): Promise<Carro | undefined> {
        const carro = await this.listaCarroID(id)
        await executarComandoSQL("DELETE FROM Carros WHERE id_carro = ?", [id])
        return carro
    }
}