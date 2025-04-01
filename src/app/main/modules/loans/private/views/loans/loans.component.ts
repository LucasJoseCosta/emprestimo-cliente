import { Component, OnInit } from '@angular/core';
import { LoanSimulation } from '../../../shared/types';
import { LoanService } from '../../../shared/services/loans.service';
import { BCBService } from '../../../shared/services/bcb.service';
import { Router } from '@angular/router';
import { LoanForm, LoanFormSendValue, LoanFormValue } from '../../forms/loan.form';
import { LoanFormService } from '../../services';
import { UntypedFormGroup } from '@angular/forms';
import { ConvertedEnum } from '../../../../../../@core/types';
import { DueDateEnum, InstallmentPeriodEnum } from '../../../shared/enums';

@Component({
    selector: 'app-loans',
    templateUrl: './loans.component.html',
    styleUrls: ['./loans.component.scss'],
    standalone: false,
})
export class LoansComponent implements OnInit {
    // Region public props
    public isLoading!: boolean;

    public loanSimulation!: LoanSimulation;

    public loan!: LoanFormValue;

    public loanForm!: UntypedFormGroup;

    public dataVencimentoConverted!: Array<ConvertedEnum>;

    public installmentPeriodConverted!: Array<ConvertedEnum>;
    // Endregion public props

    // Region private props
    private readonly loansService: LoanService;

    private readonly loansFormService: LoanFormService;

    private readonly bcbService: BCBService;

    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(loansService: LoanService, loansFormService: LoanFormService, bcbService: BCBService, router: Router) {
        // Injectables
        this.loansService = loansService;
        this.loansFormService = loansFormService;
        this.bcbService = bcbService;
        this.router = router;
    }
    // Endregion constructor

    // Region lifecycle
    ngOnInit(): void {
        this.isLoading = true;

        this.dataVencimentoConverted = this.convertEnum(DueDateEnum);
        this.installmentPeriodConverted = this.convertEnum(InstallmentPeriodEnum);

        this.loansService.loanSimulationData$.subscribe((data) => {
            this.loanSimulation = { ...this.loanSimulation, ...data };
            this.loanForm = this.loansFormService.create(this.loanSimulation);
            this.isLoading = false;
        });
    }
    // Endregion lifecycle

    // Region public methods
    public save(): void {
        if (this.loanForm.invalid) {
            this.loanForm.markAllAsTouched();
            return;
        }

        let loan: LoanFormSendValue = this.loansFormService.merge(this.loanForm, this.loan);

        this.loansService.save(loan).subscribe(
            (data) => {
                this.router.navigate(['/emprestimos']);
            },
            (error) => {
                console.error('Error saving loan:', error);
            }
        );
    }
    // Endregion public methods

    // Region private methods
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
