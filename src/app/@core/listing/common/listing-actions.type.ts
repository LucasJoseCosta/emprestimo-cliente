export type ListingAction = {
    label: string;
    severity?:
        | 'success'
        | 'info'
        | 'warn'
        | 'danger'
        | 'help'
        | 'primary'
        | 'secondary'
        | 'contrast'
        | null
        | undefined;
    callback: (params: any) => void;
    actionType?: 'edit' | 'remove' | 'view' | 'other';
    actionConfirmation?: boolean;
    actionConfirmationText?: string;
};
