import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../shared/services';
import { ListingFindPaginatedParams, PaginatedResult } from '../../../../../../@core/types';
import { Customer } from '../../../shared/types';
import { ListingData, ListingOptions, SortDirectionEnum } from '../../../../../../@core/listing/common';
import { environment } from '../../../../../../../environments/environment';
import { StatusEnum } from '../../../shared/enums';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss'],
    standalone: false,
})
export class CustomerListComponent implements OnInit {
    // Region public props
    /**
     * @inheritDoc
     */
    public currentPage!: number;
    /**
     * @inheritDoc
     */
    public isLoading!: boolean;
    /**
     * @inheritDoc
     */
    public isSearching!: boolean;
    /**
     * @inheritDoc
     */
    public itemsPerPage!: number;
    /**
     * @inheritDoc
     */
    public listingData!: ListingData<Customer>;
    /**
     * @inheritDoc
     */
    public listingOptions!: ListingOptions;
    /**
     * @inheritDoc
     */
    public sortColumn!: string;
    /**
     * @inheritDoc
     */
    public sortDirection!: SortDirectionEnum;
    // EndRegion public props
    // Region private props
    private readonly customerService: CustomerService;

    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(customerService: CustomerService, router: Router) {
        // Init public props
        this.isLoading = true;
        this.isSearching = true;
        this.currentPage = 1;
        this.itemsPerPage = environment.pagination.defaultLimit;

        // Injectables
        this.customerService = customerService;
        this.router = router;
    }
    // EndRegion constructor

    // Region Lifecycle Hooks
    ngOnInit(): void {
        // Fetch data
        this.isLoading = true;
        this.fetchData();

        // Init
        this.boostrapListingOptions();
    }
    // EndRegion Lifecycle Hooks

    // Region public methods
    public fetchData(): void {
        let listParams: ListingFindPaginatedParams = {
            pageNumber: this.currentPage,
            pageSize: this.itemsPerPage,
            sort: {
                property: this.sortColumn,
                direction: this.sortDirection,
            },
        };

        this.isSearching = true;
        this.customerService.findPaginated(listParams).subscribe(
            (response: PaginatedResult<Customer>) => {
                this.listingData = this.treatsListingData(response);
                this.isSearching = false;
                this.isLoading = false;
            },
            (error) => {
                console.error('Error fetching data', error);
                this.isSearching = false;
                this.isLoading = false;
            }
        );
    }

    public treatsListingData(paginatedResult: PaginatedResult<Customer>) {
        let listingData: ListingData<Customer>;

        listingData = {
            data: paginatedResult.content.map((customer) => ({
                ...customer,
                statusTable: this.getStatusLabel(customer.status!.status),
            })),
            totalItemsInData: paginatedResult.metadata.totalElements,
        };
        console.log(listingData);
        return listingData;
    }

    public addCustomer(): void {
        this.router.navigate(['clientes/create']);
    }

    public onPageChange(page: number): void {
        this.currentPage = page;
        this.fetchData();
    }

    public onSortChange(sortData: { property: string; direction: SortDirectionEnum }): void {
        this.sortColumn = sortData.property;
        this.sortDirection = sortData.direction;
        this.fetchData();
    }
    // EndRegion public methods

    // Region private methods
    private getStatusLabel(statusEnum: string): StatusEnum {
        if (Object.values(StatusEnum).includes(statusEnum as StatusEnum)) {
            return statusEnum as StatusEnum;
        }
        return StatusEnum.ATIVO;
    }

    private boostrapListingOptions(): void {
        this.listingOptions = {
            fields: [
                {
                    title: { singular: 'ID', plural: 'IDs' },
                    entityField: 'id',
                    isId: true,
                    orderable: true,
                },
                {
                    title: { singular: 'Nome', plural: 'Nomes' },
                    entityField: 'nome',
                    orderable: true,
                    searchable: true,
                },
                {
                    title: { singular: 'CPF', plural: 'CPFs' },
                    entityField: 'cpf',
                    orderable: false,
                    searchable: true,
                },
                {
                    title: { singular: 'Email', plural: 'Emails' },
                    entityField: 'email',
                    orderable: false,
                    searchable: true,
                },
                {
                    title: { singular: 'Telefone', plural: 'Telefones' },
                    entityField: 'telefone',
                    orderable: false,
                },
                {
                    title: { singular: 'Status', plural: 'Status' },
                    entityField: 'statusTable',
                    orderable: false,
                },
            ],
            mainAction: {
                label: 'Ver detalhes',
                callback: (params: { entity: Customer }) => {
                    console.log('Editar para:', params.entity.id);
                    this.router.navigate([`/clientes/${params.entity.id}`]);
                },
                actionType: 'view',
            },
            actions: [
                {
                    label: 'Editar',
                    severity: 'info',
                    callback: (params: { entity: Customer }) => {
                        console.log('Editar para:', params.entity.id);
                        this.router.navigate([`/clientes/${params.entity.id}`]);
                    },
                    actionType: 'edit',
                },
                {
                    label: 'Remover',
                    severity: 'danger',
                    callback: (params: { entity: Customer }) => {
                        this.deleteCliente(params.entity);
                    },
                    actionType: 'remove',
                },
            ],
        };
    }

    private deleteCliente(entity: Customer): void {
        if (entity.id !== undefined) {
            this.customerService.deleteById(entity.id).subscribe(
                () => {
                    this.fetchData();
                },
                (error) => {
                    console.error('Erro ao remover cliente', error);
                }
            );
        } else {
            console.error('Erro: ID do cliente é undefined.');
        }
    }
    // EndRegion private methods
}
