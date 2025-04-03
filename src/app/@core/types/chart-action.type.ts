export type ChartAction = {
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
    callback: () => void;
    actionType?: 'edit' | 'remove' | 'view' | 'other';
};
