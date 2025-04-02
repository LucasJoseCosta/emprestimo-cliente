import { Component, OnInit } from '@angular/core';
import { LoanSimulation } from '../../../shared/types';
import { LoanService } from '../../../shared/services/loans.service';
import { BCBService } from '../../../shared/services/bcb.service';
import { Router } from '@angular/router';
import { LoanForm, LoanFormSendValue, LoanFormValue } from '../../forms/loan.form';
import { LoanFormService } from '../../services';
import { UntypedFormGroup } from '@angular/forms';
import { ConvertedEnum, ListingFindPaginatedParams } from '../../../../../../@core/types';
import { DueDateEnum, InstallmentPeriodEnum } from '../../../shared/enums';
import { MenuItem } from 'primeng/api';
import { CustomerService } from '../../../../customers/shared/services';
import { Customer } from '../../../../customers/shared/types';
import { environment } from '../../../../../../../environments/environment';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ToastService } from '../../../../../../@core/services/toast.service';

@Component({
    selector: 'app-loans',
    templateUrl: './loans.component.html',
    styleUrls: ['./loans.component.scss'],
    standalone: false,
})
export class LoansComponent implements OnInit {
    // Region public props
    /**
     * @inheritDoc
     */
    public isLoading!: boolean;
    /**
     * @inheritDoc
     */
    public loanSimulation!: LoanSimulation;
    /**
     * @inheritDoc
     */
    public loan!: LoanFormValue;
    /**
     * @inheritDoc
     */
    public loanForm!: UntypedFormGroup;
    /**
     * @inheritDoc
     */
    public dataVencimentoConverted!: Array<ConvertedEnum>;
    /**
     * @inheritDoc
     */
    public installmentPeriodConverted!: Array<ConvertedEnum>;
    /**
     * @inheritDoc
     */
    public customers!: Array<Customer>;
    /**
     * @inheritDoc
     */
    public breadcrumbItems: Array<MenuItem>;
    /**
     * @inheritDoc
     */
    public activeIndexStep: number;
    /**
     * @inheritDoc
     */
    public stepItems: Array<MenuItem>;
    // Endregion public props

    // Region private props
    /**
     * Termo de busca input cliente
     */
    private searchTerm!: string;
    /**
     * Serviço de requisição de loan
     */
    private readonly loansService: LoanService;
    /**
     * Serviço de formulario loan
     */
    private readonly loansFormService: LoanFormService;
    /**
     * Serviço de requisição customer
     */
    private readonly customerService: CustomerService;
    /**
     * Serviço de toaster
     */
    private readonly toastService: ToastService;
    /**
     * Serviço de router
     */
    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(
        loansService: LoanService,
        loansFormService: LoanFormService,
        customerService: CustomerService,
        toastService: ToastService,
        router: Router
    ) {
        // Init public props
        this.activeIndexStep = 3;
        this.breadcrumbItems = [
            { label: 'Empréstimos', routerLink: '/emprestimos' },
            { label: 'Simulador empréstimo', routerLink: '/emprestimos/simulador' },
            { label: 'Contratar empréstimo', disabled: true },
        ];
        this.stepItems = [
            { label: 'Selecionar moeda' },
            { label: 'Simular empréstimo' },
            { label: 'Resultado da simulação' },
            { label: 'Contratar empréstimo' },
        ];

        // Injectables
        this.loansService = loansService;
        this.loansFormService = loansFormService;
        this.customerService = customerService;
        this.toastService = toastService;
        this.router = router;
    }
    // Endregion constructor

    // Region lifecycle
    ngOnInit(): void {
        this.isLoading = true;

        this.dataVencimentoConverted = this.convertEnum(DueDateEnum);
        this.installmentPeriodConverted = this.convertEnum(InstallmentPeriodEnum);

        this.fetchCustomers();
        this.loansService.loanSimulationData$.subscribe((data) => {
            this.loanSimulation = { ...this.loanSimulation, ...data };
            this.loanForm = this.loansFormService.create(this.loanSimulation);
            this.isLoading = false;
        });
    }
    // Endregion lifecycle

    // Region public methods
    /**
     * Salva emprestimo contratado
     */
    public save(): void {
        if (this.loanForm.invalid) {
            this.loanForm.markAllAsTouched();
            return;
        }

        let loan: LoanFormSendValue = this.loansFormService.merge(this.loanForm, this.loan);

        this.loansService.save(loan).subscribe(
            (data) => {
                this.toastService.showSuccess('Empréstimo', 'Empréstimo foi contratado com sucesso!');
                this.router.navigate(['/emprestimos']);
            },
            (error) => {
                console.error('Error saving loan:', error);
            }
        );
    }

    /**
     * Evento de autocomplete de input de cliente
     * @param event
     */
    public autocompleteSearch(event: AutoCompleteCompleteEvent) {
        this.searchTerm = (event.query || '').toLowerCase();
        this.fetchCustomers();
    }

    /**
     * Navegação para criação de cliente
     */
    public addCustomer() {
        this.router.navigate(['/clientes/create']);
    }
    // Endregion public methods

    // Region private methods
    /**
     * Paginado de clientes para utilizar no input
     */
    private fetchCustomers() {
        let listParams: ListingFindPaginatedParams = {
            pageNumber: 1,
            pageSize: environment.pagination.defaultLimit,
            searchTerm: this.searchTerm,
        };

        this.customerService.findPaginated(listParams).subscribe(
            (data) => {
                this.customers = data.content;
            },
            (error) => {
                this.toastService.showError('Error', error.error.message);
                console.error('Error fetching customers:', error);
            }
        );
    }

    /**
     * Conversor de enum
     * @param enumObj
     * @returns Array<ConvertedEnum>
     */
    private convertEnum<T extends Record<string, string | number>>(enumObj: T): Array<ConvertedEnum> {
        return Object.entries(enumObj)
            .filter(([key, value]) => isNaN(Number(key)))
            .map(([key, value]) => ({
                name: key,
                value: value,
            }));
    }
    // Endregion private methods
}
