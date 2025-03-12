export type Coin = {
    simbolo: string;
    nomeFormatado: string;
    tipoMoeda: string;
};

export type CurrencyQuote = {
    paridadeCompra: number;
    paridadeVenda: number;
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: Date;
    tipoBoletim: string;
};

export type CurrencyQuoteParams = {
    moeda: string;
    data: string;
};
