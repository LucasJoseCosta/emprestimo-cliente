import { Injectable } from '@angular/core';
import { Endereco, Status } from '../../shared/types';
import { EnderecoForm, StatusForm } from '../forms';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { StatusEnum } from '../../shared/enums';

@Injectable({
    providedIn: 'root',
})
export class CustomerStatusFormService {
    // Region public methods
    /**
     * Metodo que criam form de status de customer
     * @param entity
     * @returns UntypedFormGroup
     */
    public create(entity?: Status): UntypedFormGroup {
        let form: StatusForm;

        if (entity) {
            form = {
                status: new UntypedFormControl(entity.status),
                dataCadastro: new UntypedFormControl(entity.dataCadastro ? new Date(entity.dataCadastro) : null),
            };
        } else {
            form = {
                status: new UntypedFormControl(StatusEnum.ATIVO),
                dataCadastro: new UntypedFormControl(new Date().toISOString().split('T')[0]),
            };
        }
        const formGroup: UntypedFormGroup = new UntypedFormGroup(form);

        return formGroup;
    }

    /**
     * Metodo que retorna valor de form de status de customer
     * @param form
     * @param entity
     * @returns Status
     */
    public merge(form?: UntypedFormGroup, entity?: Status): Status {
        let formValue: Status = form ? form.value : entity ? entity : undefined;
        return {
            status: formValue.status,
            dataCadastro: formValue.dataCadastro,
        };
    }
    // EndRegion public methods
}
