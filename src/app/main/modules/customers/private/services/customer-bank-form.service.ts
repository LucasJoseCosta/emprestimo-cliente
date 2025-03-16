import { Injectable } from '@angular/core';
import { InfoBancarias } from '../../shared/types';
import { InfoBancariasForm } from '../forms';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class CustomerBankFormService {
    // Region public methods
    /**
     * Metodo que criam form de info bancaria de customer
     * @param entity
     * @returns UntypedFormGroup
     */
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

        formGroup.get('banco')?.setValidators([Validators.required]);
        formGroup.get('agencia')?.setValidators([Validators.required]);
        formGroup.get('contaBancaria')?.setValidators([Validators.required]);
        formGroup.get('tipoConta')?.setValidators([Validators.required]);

        return formGroup;
    }
    /**
     * Metodo que retorna valor de form de info bancarias de customer
     * @param form
     * @param entity
     * @returns InfoBancarias
     */
    public merge(form?: UntypedFormGroup, entity?: InfoBancarias): InfoBancarias {
        let formValue: InfoBancarias = form ? form.value : entity ? entity : undefined;
        return {
            banco: formValue.banco,
            agencia: formValue.agencia,
            contaBancaria: formValue.contaBancaria,
            tipoConta: formValue.tipoConta,
        };
    }
    // EndRegion public methods
}
