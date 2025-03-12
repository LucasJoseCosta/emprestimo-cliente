import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { LoanSimulation } from '../../shared/types';
import { LoanForm, LoanFormSendValue, LoanFormValue } from '../forms/loan.form';

@Injectable({
    providedIn: 'root',
})
export class LoanFormService {
    public create(entity?: LoanSimulation): UntypedFormGroup {
        let form: LoanForm;

        if (entity) {
            form = {
                cliente: new UntypedFormControl(null),
                dataEmprestimo: new UntypedFormControl(entity.dataEmprestimo ? new Date(entity.dataEmprestimo) : null),
                moeda: new UntypedFormControl(entity.moeda),
                valorObtido: new UntypedFormControl(entity.valorObtido),
                taxaConversao: new UntypedFormControl(entity.taxaConversao),
                dataVencimento: new UntypedFormControl(entity.dataVencimento),
                periodoParcelamento: new UntypedFormControl(entity.periodoParcelamento),
                valorPagamento: new UntypedFormControl(entity.valorPagamento),
            };
        } else {
            form = {
                cliente: new UntypedFormControl(null),
                dataEmprestimo: new UntypedFormControl(new Date().toISOString().split('T')[0]),
                moeda: new UntypedFormControl(null),
                valorObtido: new UntypedFormControl(null),
                taxaConversao: new UntypedFormControl(null),
                dataVencimento: new UntypedFormControl(null),
                periodoParcelamento: new UntypedFormControl(null),
                valorPagamento: new UntypedFormControl(null),
            };
        }

        const formGroup = new UntypedFormGroup(form);

        return formGroup;
    }

    public merge(form: UntypedFormGroup, entity?: LoanFormValue): LoanFormSendValue {
        let formValue: LoanFormValue = form.value;

        return {
            id: entity ? entity.id : undefined,
            cliente: {
                id: formValue.cliente,
            },
            dataEmprestimo: formValue.dataEmprestimo
                ? new Date(formValue.dataEmprestimo).toISOString().split('T')[0]
                : undefined,
            moeda: formValue.moeda,
            valorObtido: formValue.valorObtido,
            taxaConversao: formValue.taxaConversao,
            dataVencimento: formValue.dataVencimento,
            periodoParcelamento: formValue.periodoParcelamento,
            valorPagamento: formValue.valorPagamento,
        };
    }
}
