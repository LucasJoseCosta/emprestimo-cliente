import { UntypedFormControl } from '@angular/forms';
import { DueDateEnum, InstallmentPeriodEnum } from '../../shared/enums';

export type LoanSimulatorForm = {
    dataEmprestimo?: UntypedFormControl;
    moeda: UntypedFormControl;
    valorObtido: UntypedFormControl;
    taxaConversao: UntypedFormControl;
    dataVencimento: UntypedFormControl;
    periodoParcelamento: UntypedFormControl;
};

export type LoanSimulatorFormValue = {
    dataEmprestimo?: string;
    moeda: string;
    valorObtido: number;
    taxaConversao: number;
    dataVencimento: DueDateEnum;
    periodoParcelamento: InstallmentPeriodEnum;
};
