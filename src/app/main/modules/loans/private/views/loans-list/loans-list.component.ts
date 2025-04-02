import { Component, OnInit } from '@angular/core';
import { Loan } from '../../../shared/types';
import { ListingData, ListingOptions, SortDirectionEnum } from '../../../../../../@core/components/listing/common';
import { ListingFindPaginatedParams, PaginatedResult } from '../../../../../../@core/types';
import { LoanService } from '../../../shared/services/loans.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { DueDateEnum, InstallmentPeriodEnum } from '../../../shared/enums';
import { Confirmation, MenuItem } from 'primeng/api';
import { ToastService } from '../../../../../../@core/services/toast.service';
import { DialogConfirmationService } from '../../../../../../@core/services';

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
    /**
     * @inheritdoc
     */
    public breadcrumbItems: Array<MenuItem>;
    // EndRegion public props
    // Region private props
    /**
     * Serviço de requisições empréstimos
     */
    private readonly loanService: LoanService;
    /**
     * Serviço de toaster
     */
    private readonly toastService: ToastService;
    /**
     * Serviço de dialog
     */
    private readonly dialogConfirmationService: DialogConfirmationService;
    /**
     * Serviço de rotas
     */
    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(
        loanService: LoanService,
        toastService: ToastService,
        dialogConfirmationService: DialogConfirmationService,
        router: Router
    ) {
        // Init public props
        this.isLoading = true;
        this.isSearching = true;
        this.currentPage = 1;
        this.itemsPerPage = environment.pagination.defaultLimit;

        this.breadcrumbItems = [{ label: 'Empréstimos', disabled: true }];

        // Injectables
        this.loanService = loanService;
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
     * Requisição de dados da lista
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
        this.loanService.findPaginated(listParams).subscribe(
            (response: PaginatedResult<Loan>) => {
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
     * Trata dados para exibir na listagem
     * @param paginatedResult
     * @returns PaginatedResult<Loan>
     */
    public treatsListingData(paginatedResult: PaginatedResult<Loan>) {
        let listingData: ListingData<Loan>;

        listingData = {
            data: paginatedResult.content.map((loan) => {
                loan.dataEmprestimo = this.formatDate(loan.dataEmprestimo);
                return {
                    ...loan,
                    // Transients
                    clienteName: loan.cliente.nome,
                    dataVencimentoTable: this.getDataLabel(loan.dataVencimento),
                    periodoParcelamentoTable: this.getPeriodoLabel(loan.periodoParcelamento),
                };
            }),
            totalItemsInData: paginatedResult.metadata.totalElements,
        };
        return listingData;
    }

    /**
     * Navega para página de simulação de empréstimo
     */
    public simularEmprestimo(): void {
        this.router.navigate(['emprestimos/simulador']);
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
    // EndRegion public methods

    // Region private methods
    /**
     * Converte enum para exibição
     * @param installmentPeriod
     * @returns number
     */
    private getPeriodoLabel(installmentPeriod: number): number {
        return Number(InstallmentPeriodEnum[installmentPeriod]);
    }

    /**
     * Converte enum para exibição
     * @param dueDateEnum
     * @returns number
     */
    private getDataLabel(dueDateEnum: number): number {
        return Number(DueDateEnum[dueDateEnum]);
    }
    /**
     * Formata data para exibição
     */
    private formatDate(dateString?: string): string {
        if (!dateString) {
            return '';
        }
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('pt-BR');
    }

    /**
     * Configurações da tabela
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
                    title: { singular: 'Cliente', plural: 'Clientes' },
                    entityField: 'clienteName',
                    orderable: false,
                },
                {
                    title: { singular: 'Data Empréstimo', plural: 'Data Empréstimo' },
                    entityField: 'dataEmprestimo',
                    orderable: true,
                },
                {
                    title: { singular: 'Moeda', plural: 'Moedas' },
                    entityField: 'moeda',
                    orderable: false,
                    searchable: true,
                },
                {
                    title: { singular: 'Data Vencimento', plural: 'Data Vencimento' },
                    entityField: 'dataVencimentoTable',
                    orderable: true,
                },
                {
                    title: { singular: 'Parcela', plural: 'Parcelas' },
                    entityField: 'periodoParcelamentoTable',
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
                // {
                //     label: 'Editar',
                //     severity: 'info',
                //     callback: (params: { entity: Loan }) => {
                //         console.log('Editar para:', params.entity.id);
                //         // this.router.navigate([`/clientes/${params.entity.id}`]);
                //     },
                //     actionType: 'edit',
                // },
                {
                    label: 'Remover',
                    severity: 'danger',
                    callback: (params: { entity: Loan }) => {
                        let dialog: Confirmation = {
                            message: 'Tem certeza que quer deletar este empréstimo ?',
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
                                this.deleteEmprestimo(params.entity);
                            },
                        };
                        this.dialogConfirmationService.confirmDialog(dialog);
                    },
                    actionType: 'remove',
                },
            ],
        };
    }

    private deleteEmprestimo(entity: Loan): void {
        if (entity.id !== undefined) {
            this.loanService.deleteById(entity.id).subscribe(
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
    // EndRegion private methods
}
