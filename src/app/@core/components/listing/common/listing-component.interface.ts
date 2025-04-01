import { TemplateRef } from '@angular/core';
import { ListingOptions } from './listing-options.type';
import { ListingData } from './listing-data.type';
import { SortDirectionEnum } from './listing-sort-direction.enum';

export interface IListingComponent {
    //#region Public attributes
    /**
     * Flag de carregamento
     */
    isLoading: boolean;
    /**
     * Flag de carregamento para troca de página e busca
     */
    isSearching: boolean;
    /**
     * Quantidades disponíveis de itens por página
     */
    itemsPerPageLimits: Array<number>;
    /**
     * Total de itens por página
     */
    itemsPerPage: number;
    /**
     * Total de páginas
     */
    totalPages: number;
    /**
     * Página atual
     */
    currentPage: number;
    /**
     * Coluna de ordenação
     */
    sortColumn: string;
    /**
     * Coluna de ordenação
     */
    sortDirection: SortDirectionEnum;
    //#endregion

    //#region Inputs
    /**
     * @input
     * Objeto de listagem que contém as configurações da listagem
     */
    listingOptions: ListingOptions;
    /**
     * @input
     * Dados a serem exibidos na tabela
     */
    listingData: ListingData<any>;
    //#endregion
}
