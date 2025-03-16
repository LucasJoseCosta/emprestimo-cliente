import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Customer } from '../../shared/types';
import { CustomerAddressFormService } from './customer-address-form.service';
import { CustomerBankFormService } from './customer-bank-form.service';
import { CustomerForm, CustomerFormValue } from '../forms';
import { CustomerStatusFormService } from './customer-status-form.service';

@Injectable({
    providedIn: 'root',
})
export class CustomerFormService {
    // Region private props
    /**
     * Serviço de formulario de endereço de cliente
     */
    private readonly customerAddressFormService: CustomerAddressFormService;
    /**
     * Serviço de formulario de banco de cliente
     */
    private readonly customerBankFormService: CustomerBankFormService;
    /**
     * Serviço de formulario de status de cliente
     */
    private readonly customerStatusFormService: CustomerStatusFormService;
    // EndRegion private props

    // Region constructor
    constructor(
        customerAddressFormService: CustomerAddressFormService,
        customerBankFormService: CustomerBankFormService,
        customerStatusFormService: CustomerStatusFormService
    ) {
        this.customerAddressFormService = customerAddressFormService;
        this.customerBankFormService = customerBankFormService;
        this.customerStatusFormService = customerStatusFormService;
    }
    // EndRegion constructor

    // Region public methods
    /**
     * Metodo de criação de form
     * @param entity
     * @returns UntypedFormGroup
     */
    public create(entity?: Customer): UntypedFormGroup {
        let form: CustomerForm;

        if (entity) {
            form = {
                id: new UntypedFormControl(entity.id),
                nome: new UntypedFormControl(entity.nome),
                cpf: new UntypedFormControl(entity.cpf),
                dataNascimento: new UntypedFormControl(entity.dataNascimento ? new Date(entity.dataNascimento) : null),
                endereco: this.customerAddressFormService.create(entity.endereco),
                email: new UntypedFormControl(entity.email),
                telefone: new UntypedFormControl(entity.telefone),
                infoBancarias: this.customerBankFormService.create(entity.infoBancarias),
                status: this.customerStatusFormService.create(entity.status),
            };
        } else {
            form = {
                id: new UntypedFormControl(null),
                nome: new UntypedFormControl(null),
                cpf: new UntypedFormControl(null),
                dataNascimento: new UntypedFormControl(null),
                endereco: this.customerAddressFormService.create(),
                email: new UntypedFormControl(null),
                telefone: new UntypedFormControl(null),
                infoBancarias: this.customerBankFormService.create(),
                status: this.customerStatusFormService.create(),
            };
        }

        const formGroup: UntypedFormGroup = new UntypedFormGroup(form);

        formGroup.get('nome')?.setValidators([Validators.required]);
        formGroup.get('cpf')?.setValidators([Validators.required]);
        formGroup.get('dataNascimento')?.setValidators([Validators.required]);
        formGroup.get('email')?.setValidators([Validators.required]);
        formGroup.get('telefone')?.setValidators([Validators.required]);

        return formGroup;
    }

    /**
     * Metodo que converte o valor do form para um customer
     * @param form
     * @param entity
     * @returns Customer
     */
    public merge(form: UntypedFormGroup, entity?: Customer): Customer {
        let formValue: CustomerFormValue = form.value;

        return {
            id: entity?.id == null ? undefined : entity.id,
            nome: formValue.nome,
            cpf: formValue.cpf,
            dataNascimento: formValue.dataNascimento
                ? new Date(formValue.dataNascimento).toISOString().split('T')[0]
                : undefined,
            endereco: this.customerAddressFormService.merge(undefined, formValue.endereco),
            email: formValue.email,
            telefone: formValue.telefone,
            infoBancarias: this.customerBankFormService.merge(undefined, formValue.infoBancarias),
        };
    }
    // EndRegion public methods
}
