import { UntypedFormControl } from '@angular/forms';
import { UserRole } from '../../../auth/shared/types';

export type UserForm = {
    username: UntypedFormControl;
    password: UntypedFormControl;
    role: UntypedFormControl;
    first_name: UntypedFormControl;
    last_name: UntypedFormControl;
};

export type UserFormValue = {
    id?: number;
    username: string;
    password: string;
    role: UserRole;
    first_name: string;
    last_name: string;
};
