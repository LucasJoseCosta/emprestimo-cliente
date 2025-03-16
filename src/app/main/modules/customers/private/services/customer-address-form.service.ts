import { Injectable } from '@angular/core';
import { Endereco } from '../../shared/types';
import { EnderecoForm } from '../forms';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class CustomerAddressFormService {
    // Region public methods
    /**
     * Metodo que criam form de endereco de customer
     * @param entity
     * @returns UntypedFormGroup
     */
    public create(entity?: Endereco): UntypedFormGroup {
        let form: EnderecoForm;

        if (entity) {
            form = {
                logradouro: new UntypedFormControl(entity.logradouro),
                numero: new UntypedFormControl(entity.numero),
                bairro: new UntypedFormControl(entity.bairro),
                cidade: new UntypedFormControl(entity.cidade),
                estado: new UntypedFormControl(entity.estado),
            };
        } else {
            form = {
                logradouro: new UntypedFormControl(null),
                numero: new UntypedFormControl(null),
                bairro: new UntypedFormControl(null),
                cidade: new UntypedFormControl(null),
                estado: new UntypedFormControl(null),
            };
        }
        const formGroup: UntypedFormGroup = new UntypedFormGroup(form);

        formGroup.get('logradouro')?.setValidators([Validators.required]);
        formGroup.get('numero')?.setValidators([Validators.required]);
        formGroup.get('bairro')?.setValidators([Validators.required]);
        formGroup.get('cidade')?.setValidators([Validators.required]);
        formGroup.get('estado')?.setValidators([Validators.required]);

        return formGroup;
    }
    /**
     * Metodo que retorna valor de form de endereco de customer
     * @param form
     * @param entity
     * @returns Endereco
     */
    public merge(form?: UntypedFormGroup, entity?: Endereco): Endereco {
        let formValue: Endereco = form ? form.value : entity ? entity : undefined;
        return {
            logradouro: formValue.logradouro,
            numero: Number(formValue.numero),
            bairro: formValue.bairro,
            cidade: formValue.cidade,
            estado: formValue.estado,
        };
    }
    // EndRegion public methods
}
