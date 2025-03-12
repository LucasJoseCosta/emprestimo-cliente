import { ListingOptions } from './listing-options.type';
import { ListingData } from './listing-data.type';
import { SortDirectionEnum } from './listing-sort-direction.enum';

export interface IListingView<T> {
    /**
     * Flag de carregamento geral
     */
    isLoading: boolean;

    /**
     * Flag de busca e troca de página
     */
    isSearching: boolean;

    /**
     * Flag de erro na busca (trata erro de servidor)
     */
    searchError: boolean;

    /**
     * Configuração da listagem
     * {@link ListingOptions}
     */
    listingOptions: ListingOptions;

    /**
     * Dados da serem listados
     * {@link ListingData}
     */
    listingData: ListingData<T>;

    /**
     * Página atual da listagem
     */
    currentPage: number;

    /**
     * Items por página
     */
    itemsPerPage: number;

    /**
     * Coluna a ser ordenada
     */
    sortColumn: string;

    /**
     * Sentido da ordenação
     */
    sortDirection: SortDirectionEnum;

    /**
     * Caso seja necessário o tratamento dos dados antes da exibição
     * {@link ListingData}
     */
    treatsListingData?(data: any): ListingData<T>;

    /**
     * Mudança de página
     */
    onPageChange(newPage: number): void;

    /**
     * Mudança de página
     */
    onItemsPerPageChange(newLimit: number): void;

    /**
     * Mudança de ordenação
     * {@link SortDirectionEnum}
     */
    onSortChange(params: { column: string; direction: SortDirectionEnum }): void;

    /**
     * Realiza a busca de dados
     */
    fetchData(): void;
}
