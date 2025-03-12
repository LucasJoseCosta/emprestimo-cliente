import { Injectable } from '@angular/core';
import { InfoBancarias } from '../../shared/types';
import { InfoBancariasForm } from '../forms';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class CustomerBankFormService {
    public create(entity?: InfoBancarias): UntypedFormGroup {
        let form: InfoBancariasForm;

        if (entity) {
            form = {
                banco: new UntypedFormControl(entity.banco),
                agencia: new UntypedFormControl(entity.agencia),
                contaBancaria: new UntypedFormControl(entity.contaBancaria),
                tipoConta: new UntypedFormControl(entity.tipoConta),
            };
        } else {
            form = {
                banco: new UntypedFormControl(null),
                agencia: new UntypedFormControl(null),
                contaBancaria: new UntypedFormControl(null),
                tipoConta: new UntypedFormControl(null),
            };
        }
        const formGroup: UntypedFormGroup = new UntypedFormGroup(form);

        return formGroup;
    }

    public merge(form?: UntypedFormGroup, entity?: InfoBancarias): InfoBancarias {
        let formValue: InfoBancarias = form ? form.value : entity ? entity : undefined;
        return {
            banco: formValue.banco,
            agencia: formValue.agencia,
            contaBancaria: formValue.contaBancaria,
            tipoConta: formValue.tipoConta,
        };
    }
}
