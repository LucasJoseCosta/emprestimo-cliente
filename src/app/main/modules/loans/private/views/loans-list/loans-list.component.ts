import { Component, OnInit } from '@angular/core';
import { Loan } from '../../../shared/types';
import { ListingData, ListingOptions, SortDirectionEnum } from '../../../../../../@core/components/listing/common';
import { ListingFindPaginatedParams, PaginatedResult } from '../../../../../../@core/types';
import { LoanService } from '../../../shared/services/loans.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { DueDateEnum, InstallmentPeriodEnum } from '../../../shared/enums';

@Component({
    selector: 'app-loans-list',
    templateUrl: './loans-list.component.html',
    styleUrls: ['./loans-list.component.scss'],
    standalone: false,
})
export class LoansListComponent implements OnInit {
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
    public listingData!: ListingData<Loan>;
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
    private readonly loanService: LoanService;

    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(loanService: LoanService, router: Router) {
        // Init public props
        this.isLoading = true;
        this.isSearching = true;
        this.currentPage = 1;
        this.itemsPerPage = environment.pagination.defaultLimit;

        // Injectables
        this.loanService = loanService;
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
        this.loanService.findPaginated(listParams).subscribe(
            (response: PaginatedResult<Loan>) => {
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

    public treatsListingData(paginatedResult: PaginatedResult<Loan>) {
        let listingData: ListingData<Loan>;

        listingData = {
            data: paginatedResult.content.map((loan) => {
                return {
                    ...loan,
                    // Transients
                    clienteName: loan.cliente.nome,
                };
            }),
            totalItemsInData: paginatedResult.metadata.totalElements,
        };
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
    // private getStatusLabel(statusEnum: string): StatusEnum {
    //     if (Object.values(StatusEnum).includes(statusEnum as StatusEnum)) {
    //         return statusEnum as StatusEnum;
    //     }
    //     return StatusEnum.ATIVO;
    // }

    private getDataLabel(dueDateEnum: string): InstallmentPeriodEnum {
        const enumValue = Number(dueDateEnum);
        if (Object.values(DueDateEnum).includes(enumValue)) {
            return enumValue as InstallmentPeriodEnum;
        }
        return InstallmentPeriodEnum.MESES_6;
    }

    private getPeriodoLabel(dueDateEnum: string): DueDateEnum {
        const enumValue = Number(dueDateEnum);
        if (Object.values(DueDateEnum).includes(enumValue)) {
            return enumValue as DueDateEnum;
        }
        return DueDateEnum.DIA_5;
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
                    title: { singular: 'Cliente', plural: 'Clientes' },
                    entityField: 'clienteName',
                    orderable: true,
                    searchable: true,
                },
                {
                    title: { singular: 'Data Empréstimo', plural: 'Data Empréstimo' },
                    entityField: 'dataEmprestimo',
                    orderable: false,
                    searchable: true,
                },
                {
                    title: { singular: 'Moeda', plural: 'Moedas' },
                    entityField: 'moeda',
                    orderable: false,
                    searchable: true,
                },
                {
                    title: { singular: 'Data Vencimento', plural: 'Data Vencimento' },
                    entityField: 'dataVencimento',
                    orderable: true,
                },
                {
                    title: { singular: 'Parcela', plural: 'Parcelas' },
                    entityField: 'periodoParcelamento',
                    orderable: true,
                },
            ],
            mainAction: {
                label: 'Ver detalhes',
                callback: (params: { entity: Loan }) => {
                    console.log('Editar para:', params.entity.id);
                    // this.router.navigate([`/clientes/${params.entity.id}`]);
                },
                actionType: 'view',
            },
            actions: [
                {
                    label: 'Editar',
                    severity: 'info',
                    callback: (params: { entity: Loan }) => {
                        console.log('Editar para:', params.entity.id);
                        // this.router.navigate([`/clientes/${params.entity.id}`]);
                    },
                    actionType: 'edit',
                },
                {
                    label: 'Remover',
                    severity: 'danger',
                    callback: (params: { entity: Loan }) => {
                        //this.deleteCliente(params.entity);
                    },
                    actionType: 'remove',
                },
            ],
        };
    }

    // private deleteCliente(entity: Customer): void {
    //     if (entity.id !== undefined) {
    //         this.customerService.deleteById(entity.id).subscribe(
    //             () => {
    //                 this.fetchData();
    //             },
    //             (error) => {
    //                 console.error('Erro ao remover cliente', error);
    //             }
    //         );
    //     } else {
    //         console.error('Erro: ID do cliente é undefined.');
    //     }
    // }
    // EndRegion private methods
}
