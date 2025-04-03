import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { IListingComponent, ListingAction, ListingData, ListingOptions, SortDirectionEnum } from './common';
import { Table, TablePageEvent } from 'primeng/table';
import { StatusEnum } from '../../../main/modules/customers/shared/enums';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
    standalone: false,
})
export class ListingComponent implements IListingComponent, OnChanges {
    @ViewChild('dt') dt!: Table;
    // Region Getters e Setters
    /**
     * Get loading
     */
    public get isLoading(): boolean {
        return this._isLoading;
    }
    /**
     * Set loading
     */
    @Input()
    public set isLoading(value: boolean) {
        this._isLoading = value;
    }
    /**
     * Get isSearching
     */
    public get isSearching(): boolean {
        return this._isSearching;
    }
    /**
     * Set isSearch
     */
    @Input()
    public set isSearching(value: boolean) {
        this._isSearching = value;
    }
    /**
     * Get itemsPerPageLimits
     */
    public get itemsPerPageLimits(): number[] {
        return this._itemsPerPageLimits;
    }
    /**
     * Set itemsPerPageLimits
     */
    @Input()
    public set itemsPerPageLimits(value: number[]) {
        this._itemsPerPageLimits = value;
    }
    /**
     * Get itemsPerPage
     */
    public get itemsPerPage(): number {
        return this._itemsPerPage;
    }
    /**
     * Set itemsPerPage
     */
    @Input()
    public set itemsPerPage(value: number) {
        this._itemsPerPage = value;
    }
    /**
     * Get totalPages
     */
    public get totalPages(): number {
        return this._totalPages;
    }
    /**
     * Set totalPages
     */
    @Input()
    public set totalPages(value: number) {
        this._totalPages = value;
    }
    /**
     * Get currentPage
     */
    public get currentPage(): number {
        return this._currentPage;
    }
    /**
     * Set currentPage
     */
    @Input()
    public set currentPage(value: number) {
        this._currentPage = value;
    }
    /**
     * Get sortColumn
     */
    public get sortColumn(): string {
        return this._sortColumn;
    }
    /**
     * Set sortColumn
     */
    @Input()
    public set sortColumn(value: string) {
        this._sortColumn = value;
    }
    /**
     * Get sortDirection
     */
    public get sortDirection(): SortDirectionEnum {
        return this._sortDirection;
    }
    /**
     * Set sortDirection
     */
    @Input()
    public set sortDirection(value: SortDirectionEnum) {
        this._sortDirection = value;
    }
    /**
     * Get listingOptions
     */
    public get listingOptions(): ListingOptions {
        return this._listingOptions;
    }
    /**
     * Set listingOptions
     */
    @Input()
    public set listingOptions(value: ListingOptions) {
        this._listingOptions = value;
    }
    /**
     * Get listingData
     */
    public get listingData(): ListingData<any> {
        return this._listingData;
    }
    /**
     * Set listingData
     */
    @Input()
    public set listingData(value: ListingData<any>) {
        this._listingData = value;
    }
    // Endregion Getters e Setters

    // Region outputs
    @Output()
    public changePage = new EventEmitter<number>();
    @Output()
    public sort = new EventEmitter<{ property: string; direction: SortDirectionEnum }>();
    // Endregion outputs

    // Region public props
    public sortDirectionEnum = SortDirectionEnum;

    public StatusEnum = StatusEnum;
    // Endregion public props

    // Region private props
    /**
     * Flag de loading
     */
    private _isLoading!: boolean;
    /**
     * Flag de loading para busca
     */
    private _isSearching!: boolean;
    /**
     * Limite de items para page
     */
    private _itemsPerPageLimits!: number[];
    /**
     * Items por página
     */
    private _itemsPerPage!: number;
    /**
     * Total de paginas
     */
    private _totalPages!: number;
    /**
     * Página atual
     */
    private _currentPage!: number;
    /**
     * Coluna de ordenação
     */
    private _sortColumn!: string;
    /**
     * Sentido da ordenação
     */
    private _sortDirection!: SortDirectionEnum;
    /**
     * Opções de listagem
     */
    private _listingOptions!: ListingOptions;
    /**
     * Dados da listagem
     */
    private _listingData!: ListingData<any>;
    // Endregion private props;

    // Region constructor
    constructor() {}
    // Endregion constructor

    // Region Lifecycle
    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isLoading'] != null) {
            this.isLoading = changes['isLoading'].currentValue;
        }
        if (changes['listingData'] != null) {
            this.listingData = { ...this.listingData, data: [...changes['listingData'].currentValue.data] };
        }
        if (changes['itemsPerPage'] != null) {
            this.itemsPerPage = changes['itemsPerPage'].currentValue;
        }

        if (changes['currentPage']) {
            this.currentPage = changes['currentPage'].currentValue;
        }
    }

    // EndRegion Lifecycle

    // Region public methods
    /**
     * Tratamento para mudança de página (paginator do PrimeNG)
     */
    public onPageChange(event: TablePageEvent): void {
        const page = Number(event.first / event.rows + 1);
        this.changePage.emit(page);
    }
    /**
     * Tratamento para ordenação
     */
    public onSortChange(property: string, direction: SortDirectionEnum): void {
        this.sort.emit({ property, direction });
    }
    /**
     * Chama a ação definida para um item da listagem.
     * @param action A ação a ser executada.
     * @param item O item da listagem sobre o qual a ação é aplicada.
     */
    public callAction(action: ListingAction, item: any): void {
        if (action && typeof action.callback === 'function') {
            action.callback({ entity: item });
        }
    }
    // Endregion public methods
}
