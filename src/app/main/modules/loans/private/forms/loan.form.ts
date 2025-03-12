import { UntypedFormControl } from '@angular/forms';
import { DueDateEnum, InstallmentPeriodEnum } from '../../shared/enums';

export type LoanForm = {
    cliente: UntypedFormControl;
    dataEmprestimo?: UntypedFormControl;
    moeda: UntypedFormControl;
    valorObtido: UntypedFormControl;
    taxaConversao: UntypedFormControl;
    dataVencimento: UntypedFormControl;
    periodoParcelamento: UntypedFormControl;
    valorPagamento?: UntypedFormControl;
};

export type LoanFormValue = {
    id?: number;
    cliente: number;
    dataEmprestimo?: string;
    moeda: string;
    valorObtido: number;
    taxaConversao: number;
    dataVencimento: DueDateEnum;
    periodoParcelamento: InstallmentPeriodEnum;
    valorPagamento?: number;
};

export type LoanFormSendValue = {
    id?: number;
    cliente: {
        id: number;
    };
    dataEmprestimo?: string;
    moeda: string;
    valorObtido: number;
    taxaConversao: number;
    dataVencimento: DueDateEnum;
    periodoParcelamento: InstallmentPeriodEnum;
    valorPagamento?: number;
};
