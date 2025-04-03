import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../shared/services';
import { ListingFindPaginatedParams, PaginatedResult } from '../../../../../../@core/types';
import { Customer } from '../../../shared/types';
import { ListingData, ListingOptions, SortDirectionEnum } from '../../../../../../@core/components/listing/common';
import { environment } from '../../../../../../../environments/environment';
import { StatusEnum } from '../../../shared/enums';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../../@core/services/toast.service';
import { Confirmation, MenuItem } from 'primeng/api';
import { DialogConfirmationService } from '../../../../../../@core/services';

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
    /**
     * @inheritdoc
     */
    public breadcrumbItems: Array<MenuItem>;
    // EndRegion public props
    // Region private props
    /**
     * Serviço de requisições de customer
     */
    private readonly customerService: CustomerService;
    /**
     * Serviço de toast
     */
    private readonly toastService: ToastService;
    /**
     * Serviço de dialog
     */
    private readonly dialogConfirmationService: DialogConfirmationService;
    /**
     * Serviço de rota
     */
    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(
        customerService: CustomerService,
        toastService: ToastService,
        dialogConfirmationService: DialogConfirmationService,
        router: Router
    ) {
        // Init public props
        this.isLoading = true;
        this.isSearching = true;
        this.currentPage = 1;
        this.itemsPerPage = environment.pagination.defaultLimit;

        this.breadcrumbItems = [{ label: 'Clientes', disabled: true }];

        // Injectables
        this.customerService = customerService;
        this.toastService = toastService;
        this.dialogConfirmationService = dialogConfirmationService;
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
    /**
     * Carrega dados para listagem
     */
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
                this.toastService.showError('Error', error.message);
                this.isSearching = false;
                this.isLoading = false;
            }
        );
    }

    /**
     * Faz tratativa de dados para apresentação em tabela
     * @param paginatedResult
     * @returns ListingData<Customer>
     */
    public treatsListingData(paginatedResult: PaginatedResult<Customer>): ListingData<Customer> {
        let listingData: ListingData<Customer>;

        listingData = {
            data: paginatedResult.content.map((customer) => ({
                ...customer,
                statusTable: this.getStatusLabel(customer.status!.status),
            })),
            totalItemsInData: paginatedResult.metadata.totalElements,
        };
        return listingData;
    }

    /**
     * Rota de adição de customer
     */
    public addCustomer(): void {
        this.router.navigate(['clientes/create']);
    }

    /**
     * Função de troca de página
     * @param page
     */
    public onPageChange(page: number): void {
        this.currentPage = page;
        this.fetchData();
    }
    /**
     * Ordenação de tabela
     * @param sortData
     */
    public onSortChange(sortData: { property: string; direction: SortDirectionEnum }): void {
        this.sortColumn = sortData.property;
        this.sortDirection = sortData.direction;
        this.fetchData();
    }
    // EndRegion public methods

    // Region private methods
    /**
     * Traduz Enum para tabela
     * @param statusEnum
     * @returns StatusEnum
     */
    private getStatusLabel(statusEnum: string): StatusEnum {
        const status = Object.keys(StatusEnum).find((key) => key === statusEnum) as keyof typeof StatusEnum;
        return status ? StatusEnum[status] : StatusEnum.ATIVO;
    }
    /**
     * Configurações de componente de listagem
     */
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
                    orderable: true,
                },
            ],
            mainAction: {
                label: 'Ver detalhes',
                callback: (params: { entity: Customer }) => {
                    this.router.navigate([`/clientes/${params.entity.id}`]);
                },
                actionType: 'view',
            },
            actions: [
                {
                    label: 'Editar',
                    severity: 'info',
                    callback: (params: { entity: Customer }) => {
                        this.router.navigate([`/clientes/${params.entity.id}`]);
                    },
                    actionType: 'edit',
                },
                {
                    label: 'Remover',
                    severity: 'danger',
                    callback: (params: { entity: Customer }) => {
                        let dialog: Confirmation = {
                            message: 'Tem certeza que quer deletar este cliente ?',
                            header: 'Deletar',
                            closable: true,
                            closeOnEscape: true,
                            icon: 'pi pi-times-circle',
                            rejectButtonProps: {
                                label: 'Cancelar',
                                severity: 'secondary',
                                outlined: true,
                            },
                            acceptButtonProps: {
                                label: 'Deletar',
                                severity: 'danger',
                            },
                            accept: () => {
                                this.deleteCliente(params.entity);
                            },
                        };
                        this.dialogConfirmationService.confirmDialog(dialog);
                    },
                    actionType: 'remove',
                },
            ],
        };
    }

    /**
     * Deleta um customer
     * @param entity
     */
    private deleteCliente(entity: Customer): void {
        if (entity.id !== undefined) {
            this.customerService.deleteById(entity.id).subscribe(
                () => {
                    this.toastService.showSuccess('Sucesso', `Cliente com id: ${entity.id} foi deletado com sucesso`);
                    this.fetchData();
                },
                (error) => {
                    this.toastService.showError('Error', error.message);
                }
            );
        } else {
            this.toastService.showError('Error', 'ID do cliente é undefined.');
        }
    }
    // EndRegion private methods
}
