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

@Component({
    selector: 'app-loans-simulator',
    templateUrl: './loans-simulator.component.html',
    styleUrls: ['./loans-simulator.component.scss'],
    standalone: false,
})
export class LoansSimulatorComponent implements OnInit {
    // Region public props
    public isLoading!: boolean;

    public loanSimulation!: LoanSimulation;

    public loanSimulationForm!: UntypedFormGroup;

    public currencyQuotes!: Array<CurrencyQuote>;

    public coins!: Array<Coin>;

    public dataVencimentoConverted!: Array<ConvertedEnum>;

    public installmentPeriodConverted!: Array<ConvertedEnum>;
    // EndRegion public props

    // Region private props
    private readonly loansService: LoanService;

    private readonly loansSimulatorFormService: LoanSimulationFormService;

    private readonly bcbService: BCBService;

    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(
        loansService: LoanService,
        loansSimulatorFormService: LoanSimulationFormService,
        bcbService: BCBService,
        router: Router
    ) {
        // Injectables
        this.loansService = loansService;
        this.loansSimulatorFormService = loansSimulatorFormService;
        this.bcbService = bcbService;
        this.router = router;
    }
    // EndRegion constructor

    // Region lifecycle
    ngOnInit(): void {
        this.isLoading = true;

        this.dataVencimentoConverted = this.convertEnum(DueDateEnum);
        this.installmentPeriodConverted = this.convertEnum(InstallmentPeriodEnum);

        console.log(this.dataVencimentoConverted);

        this.bcbService.getCoins().subscribe((response) => {
            this.coins = response;
            this.loanSimulationForm = this.loansSimulatorFormService.create();
            this.isLoading = false;
        });
    }
    // EndRegion lifecycle

    // Region public methods
    public onCurrencyChange($event: SelectChangeEvent): void {
        let currentDate = new Date();
        let formattedDate = this.formatDate(currentDate);

        let quotesParams: CurrencyQuoteParams = {
            moeda: $event.value,
            data: formattedDate,
        };

        this.bcbService.getCurrencysQuotes(quotesParams).subscribe((response) => {
            this.currencyQuotes = response;
            console.log(this.currencyQuotes);
            this.loanSimulationForm
                .get('taxaConversao')
                ?.patchValue(this.currencyQuotes[this.currencyQuotes.length - 1].cotacaoVenda);
        });
    }

    public simularEmprestimo(): void {
        let loanSimilate: LoanSimulation = this.loansSimulatorFormService.merge(this.loanSimulationForm);

        this.loansService.loanSimulation(loanSimilate).subscribe((response) => {
            this.loanSimulation = response;
        });
    }

    public criarEmprestimo(): void {
        this.loansService.loanSimulationData = this.loanSimulation;
        this.router.navigate(['/emprestimos/create']);
    }
    // Endregion Public methods

    // Region private methods
    private formatDate(date: Date): string {
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let year = date.getFullYear();

        return `${month}-${day}-${year}`;
    }

    private convertEnum<T extends Record<string, string | number>>(enumObj: T): Array<ConvertedEnum> {
        return Object.entries(enumObj)
            .filter(([key, value]) => isNaN(Number(key))) // Filtra apenas as chaves que são strings
            .map(([key, value]) => ({
                name: key,
                value: value,
            }));
    }
    // Endregion private methods
}
