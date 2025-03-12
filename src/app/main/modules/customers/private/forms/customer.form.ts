import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Endereco, InfoBancarias, Status } from '../../shared/types';

export type CustomerForm = {
    id: UntypedFormControl;
    nome: UntypedFormControl;
    cpf: UntypedFormControl;
    dataNascimento: UntypedFormControl;
    endereco: UntypedFormGroup;
    email: UntypedFormControl;
    telefone: UntypedFormControl;
    infoBancarias: UntypedFormGroup;
    status: UntypedFormGroup;
};

export type EnderecoForm = {
    logradouro: UntypedFormControl;
    numero: UntypedFormControl;
    bairro: UntypedFormControl;
    cidade: UntypedFormControl;
    estado: UntypedFormControl;
};

export type InfoBancariasForm = {
    banco: UntypedFormControl;
    agencia: UntypedFormControl;
    contaBancaria: UntypedFormControl;
    tipoConta: UntypedFormControl;
};

export type StatusForm = {
    status: UntypedFormControl;
    dataCadastro: UntypedFormControl;
};

export type CustomerFormValue = {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    endereco: Endereco;
    email: string;
    telefone: string;
    infoBancarias: InfoBancarias;
    status: Status;
};
