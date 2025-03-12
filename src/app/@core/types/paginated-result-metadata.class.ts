export class PaginatedResultMetadata {
    /**
     * Número da página atual.
     */
    public pageNumber: number;

    /**
     * Número de registros por página.
     */
    public pageSize: number;

    /**
     * Total de registros disponíveis.
     */
    public totalElements: number;

    /**
     * Total de páginas disponíveis.
     */
    public totalPages: number;

    /**
     * Totalizadores (outras informações adicionais, se necessário).
     */
    public totalizers: any;

    constructor(
        pageNumber: number = 0,
        pageSize: number = 0,
        totalElements: number = 0,
        totalPages: number = 0,
        totalizers: any = {}
    ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.totalizers = totalizers;
    }

    /**
     * Cria uma instância de PaginatedResultMetadata a partir da resposta da API.
     * @param response Objeto contendo pageNumber, pageSize, totalElements, totalPages e opcionalmente totalizers.
     */
    public static fromResponse(response: any): PaginatedResultMetadata {
        return new PaginatedResultMetadata(
            response.pageNumber,
            response.pageSize,
            response.totalElements,
            response.totalPages,
            response.totalizers || {}
        );
    }
}
