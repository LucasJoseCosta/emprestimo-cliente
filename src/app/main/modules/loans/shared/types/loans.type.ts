import { Customer } from '../../../customers/shared/types';
import { DueDateEnum, InstallmentPeriodEnum } from '../enums';

export type Loan = {
    id?: number;
    cliente: Customer;
    dataEmprestimo?: string;
    moeda: string;
    valorObtido: number;
    taxaConversao: number;
    dataVencimento: DueDateEnum;
    periodoParcelamento: InstallmentPeriodEnum;
    valorPagamento: number;

    // Transients
    clienteName?: string;
    dataVencimentoTable?: number;
    periodoParcelamentoTable?: number;
};

export type LoanSimulation = {
    dataEmprestimo?: string;
    moeda: string;
    valorObtido: number;
    taxaConversao: number;
    dataVencimento: DueDateEnum;
    periodoParcelamento: InstallmentPeriodEnum;
    valorPagamento?: number;
};
