import { UntypedFormControl } from '@angular/forms';
import { DueDateEnum, InstallmentPeriodEnum } from '../../shared/enums';
import { Customer } from '../../../customers/shared/types';

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
    cliente: Customer;
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
