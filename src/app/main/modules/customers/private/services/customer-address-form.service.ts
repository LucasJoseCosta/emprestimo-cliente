import { Injectable } from '@angular/core';
import { Endereco } from '../../shared/types';
import { EnderecoForm } from '../forms';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class CustomerAddressFormService {
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

        return formGroup;
    }

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
}
