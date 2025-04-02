import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
                dataEmprestimo: new UntypedFormControl(
                    entity.dataEmprestimo ? this.parseDate(entity.dataEmprestimo) : null
                ),
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

        formGroup.get('cliente')?.setValidators([Validators.required]);
        formGroup.get('dataEmprestimo')?.setValidators([Validators.required]);
        formGroup.get('moeda')?.setValidators([Validators.required]);
        formGroup.get('valorObtido')?.setValidators([Validators.required]);
        formGroup.get('taxaConversao')?.setValidators([Validators.required]);
        formGroup.get('dataVencimento')?.setValidators([Validators.required]);
        formGroup.get('periodoParcelamento')?.setValidators([Validators.required]);
        formGroup.get('valorPagamento')?.setValidators([Validators.required]);

        return formGroup;
    }

    public merge(form: UntypedFormGroup, entity?: LoanFormValue): LoanFormSendValue {
        let formValue: LoanFormValue = form.value;

        return {
            id: entity ? entity.id : undefined,
            cliente: {
                id: formValue.cliente.id || 0,
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

    private parseDate(dateString: string) {
        const parts = dateString.split('-');
        return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }
}
