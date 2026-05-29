export declare class NotaFiscal {
    id_nota: number;
    numero_nota: string;
    data_emissao: Date;
    valor_total: number;
    id_cliente: number;
    id_vendedor: number;
    id_carro: number;
    constructor(numero_nota: string, data_emissao: Date, valor_total: number, id_cliente: number, id_vendedor: number, id_carro: number);
    geraId(): number;
}
//# sourceMappingURL=notaFiscal.d.ts.map