import { ListingFields } from './listing-fields.type';
import { ListingAction } from './listing-actions.type';

export type ListingOptions = {
    // Campos da tabela
    fields: Array<ListingFields>;

    // Ações no item da listagem
    mainAction: ListingAction;
    actions?: Array<ListingAction>;
    childrenMainAction?: ListingAction;
};
