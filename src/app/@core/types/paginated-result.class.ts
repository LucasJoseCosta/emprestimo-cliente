import { PaginatedResultMetadata } from './paginated-result-metadata.class';

export class PaginatedResult<T> implements Iterable<T> {
    /**
     * Lista de resultados da consulta paginada (conteúdo da página)
     */
    public content: Array<T>;

    /**
     * Metadados da consulta paginada
     */
    public metadata: PaginatedResultMetadata;

    constructor(content: Array<T> = [], metadata: PaginatedResultMetadata = new PaginatedResultMetadata()) {
        this.content = content;
        this.metadata = metadata;
    }

    [Symbol.iterator](): Iterator<T> {
        let pointer = 0;
        const content = this.content;
        return {
            next(): IteratorResult<T> {
                if (pointer < content.length) {
                    return { done: false, value: content[pointer++] };
                } else {
                    return { done: true, value: undefined as unknown as T };
                }
            },
        };
    }
}
