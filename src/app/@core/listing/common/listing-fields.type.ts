import { CustomDatePipes } from './list.type';

export type ListingFields = {
    title: {
        singular: string;
        plural: string;
        hideOnHeader?: boolean;
    };
    entityField: string; // Nome do campo dentro da entidade
    subEntityField?: string; // Tem dado menor a ser exibido na mesma coluna

    isId?: boolean; // Flag de ID
    hide?: boolean; // Flag de exibição
    callMainAction?: boolean; // se clicar no campo chama a ação principal
    mainActionNewPage?: boolean; // se abre ação em nova aba

    size?: number; // tamanho do campo para visualização
    type?: string; // tipo do campo
    customDatePipe?: CustomDatePipes;
    orderable?: boolean; // Flag que habilita ordenação
    searchable?: boolean; // Flag que habilita busca

    customClass?: string; // Classe customizada
};
