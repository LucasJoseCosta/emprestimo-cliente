import { Component, OnInit } from '@angular/core';
import { Coin, CurrencyQuoteParams, CurrencyQuote, LoanSimulation } from '../../../shared/types';
import { LoanService } from '../../../shared/services/loans.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BCBService } from '../../../shared/services/bcb.service';
import { LoanSimulatorForm } from '../../forms';
import { LoanSimulationFormService } from '../../services/loan-simulator-form.service';
import { UntypedFormGroup } from '@angular/forms';
import { SelectChangeEvent } from 'primeng/select';
import { ConvertedEnum } from '../../../../../../@core/types';
import { DueDateEnum, InstallmentPeriodEnum } from '../../../shared/enums';
import { MenuItem } from 'primeng/api';
import { ToastService } from '../../../../../../@core/services/toast.service';

@Component({
    selector: 'app-loans-simulator',
    templateUrl: './loans-simulator.component.html',
    styleUrls: ['./loans-simulator.component.scss'],
    standalone: false,
})
export class LoansSimulatorComponent implements OnInit {
    // Region public props
    /**
     * @inheritdoc
     */
    public isLoading!: boolean;
    /**
     * @inheritdoc
     */
    public loanSimulation!: LoanSimulation;
    /**
     * @inheritdoc
     */
    public loanSimulationForm!: UntypedFormGroup;
    /**
     * @inheritdoc
     */
    public currencyQuotes!: Array<CurrencyQuote>;
    /**
     * @inheritdoc
     */
    public coins!: Array<Coin>;
    /**
     * @inheritdoc
     */
    public coin!: string;
    /**
     * @inheritdoc
     */
    public dataVencimentoConverted!: Array<ConvertedEnum>;
    /**
     * @inheritdoc
     */
    public installmentPeriodConverted!: Array<ConvertedEnum>;
    /**
     * @inheritdoc
     */
    public breadcrumbItems: Array<MenuItem>;
    /**
     * @inheritdoc
     */
    public stepItems: Array<MenuItem>;
    /**
     * @inheritdoc
     */
    public activeIndexStep: number;
    // EndRegion public props

    // Region private props
    /**
     * Serviço de requisições de loans
     */
    private readonly loansService: LoanService;
    /**
     * Serviço de form para simular empréstimo
     */
    private readonly loansSimulatorFormService: LoanSimulationFormService;
    /**
     * Serviço de requisições para o banco central
     */
    private readonly bcbService: BCBService;
    /**
     * Serviço de toaster
     */
    private readonly toastService: ToastService;
    /**
     * Serviço de rotas
     */
    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(
        loansService: LoanService,
        loansSimulatorFormService: LoanSimulationFormService,
        bcbService: BCBService,
        toastService: ToastService,
        router: Router
    ) {
        // Init public props
        this.activeIndexStep = 0;
        this.breadcrumbItems = [
            { label: 'Empréstimos', routerLink: '/emprestimos' },
            { label: 'Simulador empréstimo', disabled: true },
        ];
        this.stepItems = [
            { label: 'Selecionar moeda' },
            { label: 'Simular empréstimo' },
            { label: 'Resultado da simulação' },
            { label: 'Contratar empréstimo' },
        ];

        // Injectables
        this.loansService = loansService;
        this.loansSimulatorFormService = loansSimulatorFormService;
        this.bcbService = bcbService;
        this.toastService = toastService;
        this.router = router;
    }
    // EndRegion constructor

    // Region lifecycle
    ngOnInit(): void {
        this.isLoading = true;

        this.dataVencimentoConverted = this.convertEnum(DueDateEnum);
        this.installmentPeriodConverted = this.convertEnum(InstallmentPeriodEnum);

        this.bcbService.getCoins().subscribe(
            (response) => {
                this.coins = response;
                this.loanSimulationForm = this.loansSimulatorFormService.create();
                this.isLoading = false;
            },
            (error) => {
                this.toastService.showError('Error', error.message);
                this.router.navigate(['/emprestimos']);
                this.isLoading = false;
            }
        );
    }
    // EndRegion lifecycle

    // Region public methods
    /**
     * Pega moeda selecionada e adicona valor de cotação no controller para taxaConvesao
     * @param $event
     */
    public onCurrencyChange($event: SelectChangeEvent): void {
        let currentDate = new Date();
        this.tryGetCurrencyQuote($event.value, currentDate, 0);
    }

    /**
     * Gera o emprestimo simulado
     */
    public simularEmprestimo(): void {
        if (this.loanSimulationForm.invalid) {
            this.loanSimulationForm.markAllAsTouched();
            return;
        }
        let loanSimilate: LoanSimulation = this.loansSimulatorFormService.merge(this.loanSimulationForm);

        this.loansService.loanSimulation(loanSimilate).subscribe((response) => {
            this.loanSimulation = response;
            this.activeIndexStep = 2;
        });
    }

    /**
     * Direciona o emprestimo simulado para a criação do emprestimo
     */
    public criarEmprestimo(): void {
        this.loansService.loanSimulationData = this.loanSimulation;
        this.router.navigate(['/emprestimos/create']);
    }
    /**
     * Formata data para exibição
     */
    public formatDateLoanResult(dateString?: string): string {
        if (!dateString) {
            return '';
        }
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('pt-BR');
    }

    public formatCurrency(value?: number, currencyCode?: string): string {
        if (!value || !currencyCode) {
            return '';
        }
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currencyCode,
        }).format(value);
    }

    // Region private methods
    /**
     * Converte enum para exibição
     * @param installmentPeriod
     * @returns number
     */
    public getPeriodoLabel(installmentPeriod: number): number {
        return Number(InstallmentPeriodEnum[installmentPeriod]);
    }

    /**
     * Converte enum para exibição
     * @param dueDateEnum
     * @returns number
     */
    public getDataLabel(dueDateEnum: number): number {
        return Number(DueDateEnum[dueDateEnum]);
    }

    // Endregion Public methods

    // Region private methods
    /**
     * Lida com a requisição de taxa de conversão
     * @param currency
     * @param date
     * @param retryCount
     * @returns taxa de conversão
     */
    private tryGetCurrencyQuote(currency: string, date: Date, retryCount: number): void {
        if (retryCount > 2) {
            // Limita a tentativa a 2 dias anteriores
            this.toastService.showError('Erro', 'Não foi possível obter a cotação.');
            return;
        }

        let formattedDate = this.formatDate(date);

        let quotesParams: CurrencyQuoteParams = {
            moeda: currency,
            data: formattedDate,
        };

        this.coin = currency;

        this.bcbService.getCurrencysQuotes(quotesParams).subscribe(
            (response) => {
                if (response) {
                    this.currencyQuotes = response;
                    this.loanSimulationForm
                        .get('taxaConversao')
                        ?.patchValue(this.currencyQuotes[this.currencyQuotes.length - 1].cotacaoVenda);
                    this.activeIndexStep = 1;
                } else {
                    let previousDate = new Date(date);
                    previousDate.setDate(date.getDate() - 1);
                    this.tryGetCurrencyQuote(currency, previousDate, retryCount + 1);
                }
            },
            (error) => {
                this.toastService.showError('Erro', error.message);
                console.error(error);
            }
        );
    }
    /**
     * Formata data para requisição de taxa de conversão
     * @param date
     * @returns string
     */
    private formatDate(date: Date): string {
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let year = date.getFullYear();

        return `${month}-${day}-${year}`;
    }

    /**
     * Converte enum para select
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
