import { BancoEnum, EstadoEnum, StatusEnum, TipoContaEnum } from '../enums';

export type Customer = {
    id?: number;
    nome: string;
    cpf: string;
    dataNascimento?: string;
    endereco: Endereco;
    email: string;
    telefone: string;
    infoBancarias: InfoBancarias;
    status?: Status;

    // Transients
    statusTable?: StatusEnum;
};

export type Endereco = {
    logradouro: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: EstadoEnum;
};

export type InfoBancarias = {
    banco: BancoEnum;
    agencia: string;
    contaBancaria: string;
    tipoConta: TipoContaEnum;
};

export type Status = {
    status: StatusEnum;
    dataCadastro: Date;
};
