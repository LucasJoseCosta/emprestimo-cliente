import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LoanSimulatorForm, LoanSimulatorFormValue } from '../forms';
import { LoanSimulation } from '../../shared/types';

@Injectable({
    providedIn: 'root',
})
export class LoanSimulationFormService {
    public create(): UntypedFormGroup {
        let form: LoanSimulatorForm;

        form = {
            dataEmprestimo: new UntypedFormControl(new Date().toISOString().split('T')[0]),
            moeda: new UntypedFormControl(null),
            valorObtido: new UntypedFormControl(null),
            taxaConversao: new UntypedFormControl(null),
            dataVencimento: new UntypedFormControl(null),
            periodoParcelamento: new UntypedFormControl(null),
        };

        const formGroup = new UntypedFormGroup(form);

        formGroup.get('valorObtido')?.setValidators([Validators.required]);
        formGroup.get('taxaConversao')?.setValidators([Validators.required]);
        formGroup.get('dataVencimento')?.setValidators([Validators.required]);
        formGroup.get('periodoParcelamento')?.setValidators([Validators.required]);

        return formGroup;
    }

    public merge(form: UntypedFormGroup): LoanSimulatorFormValue {
        let formValue: LoanSimulatorFormValue = form.value;

        return {
            dataEmprestimo: formValue.dataEmprestimo,
            moeda: formValue.moeda,
            valorObtido: formValue.valorObtido,
            taxaConversao: formValue.taxaConversao,
            dataVencimento: formValue.dataVencimento,
            periodoParcelamento: formValue.periodoParcelamento,
        };
    }
}
