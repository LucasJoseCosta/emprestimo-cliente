import { Component, OnInit } from '@angular/core';
import { ListingData, ListingOptions, SortDirectionEnum } from '../../../../../../@core/components/listing/common';
import { User } from '../../../../auth/shared/types';
import { Confirmation, MenuItem } from 'primeng/api';
import { UserService } from '../../../shared/services/user.service';
import { DialogConfirmationService, ToastService } from '../../../../../../@core/services';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { ListingFindPaginatedParams, PaginatedResult } from '../../../../../../@core/types';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    standalone: false,
})
export class UserListComponent implements OnInit {
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
    public listingData!: ListingData<User>;
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
     * Serviço de requisições de usuários
     */
    private readonly userService: UserService;
    /**
     * Serviço de toaster
     */
    private readonly toastService: ToastService;
    /**
     * Serviço de dialog
     */
    private readonly dialogService: DialogConfirmationService;
    /**
     * Serviço de rotas
     */
    private readonly router: Router;
    // EndRegion private props
    // Region Constructor
    constructor(
        userService: UserService,
        toastService: ToastService,
        dialogService: DialogConfirmationService,
        router: Router
    ) {
        // Init public props
        this.isLoading = true;
        this.isSearching = true;
        this.currentPage = 1;
        this.itemsPerPage = environment.pagination.defaultLimit;

        this.breadcrumbItems = [{ label: 'Usuários', disabled: true }];

        // Injectables
        this.userService = userService;
        this.toastService = toastService;
        this.dialogService = dialogService;
        this.router = router;
    }
    // EndRegion Constructor
    // Region Lifecycle Hooks
    ngOnInit(): void {
        // Fetch data
        this.isLoading = true;
        this.fetchData();

        // Init
        this.boostrapListingOptions();
    }
    // EndRegion Lifecycle Hooks
    // Region Public Methods
    /**
     * Requisição de listagem de usuários
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
        this.userService.findPaginated(listParams).subscribe(
            (response: PaginatedResult<User>) => {
                this.listingData = this.treatsListingData(response);
                this.isSearching = false;
                this.isLoading = false;
            },
            (error) => {
                this.isSearching = false;
                this.isLoading = false;
                this.toastService.showError('Error', error.message);
            }
        );
    }
    /**
     * Tratamento de dados de listagem
     * @param response
     * @returns listingData
     */
    public treatsListingData(response: PaginatedResult<User>): ListingData<User> {
        let listingData: ListingData<User> = {
            data: response.content,
            totalItemsInData: response.metadata.totalElements,
        };

        return listingData;
    }
    /**
     * Lida com evento de paginado
     * @param page
     */
    public onPageChange(page: number): void {
        this.currentPage = page;
        this.fetchData();
    }

    /**
     * Lida com evento de ordenação
     * @param sortData
     */
    public onSortChange(sortData: { property: string; direction: SortDirectionEnum }): void {
        this.sortColumn = sortData.property;
        this.sortDirection = sortData.direction;
        this.fetchData();
    }
    /**
     * Direciona para a página de criação de usuários
     */
    public addUser() {
        this.router.navigate(['/usuarios/create']);
    }
    // Region Private Methods
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
                    title: { singular: 'Username', plural: 'Username' },
                    entityField: 'username',
                    orderable: true,
                },
                {
                    title: { singular: 'Nome', plural: 'Nomes' },
                    entityField: 'first_name',
                    orderable: true,
                },
                {
                    title: { singular: 'Sobrenome', plural: 'Sobrenomes' },
                    entityField: 'last_name',
                    orderable: true,
                },
                {
                    title: { singular: 'Role', plural: 'Roles' },
                    entityField: 'role',
                    orderable: true,
                },
            ],
            mainAction: {
                label: 'Ver detalhes',
                callback: (params: { entity: User }) => {
                    //console.log('Editar para:', params.entity.id);
                    // this.router.navigate([`/clientes/${params.entity.id}`]);
                },
                actionType: 'view',
            },
            actions: [
                {
                    label: 'Editar',
                    severity: 'info',
                    callback: (params: { entity: User }) => {
                        this.router.navigate([`/usuarios/${params.entity.id}`]);
                    },
                    actionType: 'edit',
                },
                {
                    label: 'Remover',
                    severity: 'danger',
                    callback: (params: { entity: User }) => {
                        let dialog: Confirmation = {
                            message: 'Tem certeza que quer deletar este usuário ?',
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
                                this.deleteUsuario(params.entity);
                            },
                        };
                        this.dialogService.confirmDialog(dialog);
                    },
                    actionType: 'remove',
                },
            ],
        };
    }

    private deleteUsuario(entity: User): void {
        if (entity.id !== undefined) {
            this.userService.deleteById(Number(entity.id)).subscribe(
                () => {
                    this.toastService.showSuccess(
                        'Sucesso',
                        `Empréstimo com id: ${entity.id} foi deletado com sucesso`
                    );
                    this.fetchData();
                },
                (error) => {
                    this.toastService.showError('Error', error.message);
                }
            );
        } else {
            this.toastService.showError('Error', 'Erro: ID do cliente é undefined.');
        }
    }
}
