import * as bcrypt from 'bcryptjs';
import { Injectable } from '@angular/core';
import { User } from '../../../auth/shared/types';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserForm } from '../forms';

@Injectable({
    providedIn: 'root',
})
export class UserFormService {
    public create(entity?: User): UntypedFormGroup {
        let form: UserForm;
        if (entity) {
            form = {
                username: new UntypedFormControl(entity.username),
                password: new UntypedFormControl(entity.password),
                role: new UntypedFormControl(entity.role),
                first_name: new UntypedFormControl(entity.first_name),
                last_name: new UntypedFormControl(entity.last_name),
            };
        } else {
            form = {
                username: new UntypedFormControl(null),
                password: new UntypedFormControl(null),
                role: new UntypedFormControl(null),
                first_name: new UntypedFormControl(null),
                last_name: new UntypedFormControl(null),
            };
        }

        const formGroup = new UntypedFormGroup(form);

        formGroup.get('username')?.setValidators([Validators.required]);
        formGroup.get('password')?.setValidators([Validators.required]);
        formGroup.get('role')?.setValidators([Validators.required]);
        formGroup.get('first_name')?.setValidators([Validators.required]);
        formGroup.get('last_name')?.setValidators([Validators.required]);
        return formGroup;
    }

    public async merge(form: UntypedFormGroup, entity?: User): Promise<User> {
        const formValue: User = form.value;

        let password = formValue.password;

        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        } else if (entity) {
            password = entity.password;
        }

        return {
            id: entity ? entity.id : undefined,
            username: formValue.username,
            password: password,
            role: formValue.role,
            first_name: formValue.first_name,
            last_name: formValue.last_name,
        };
    }
}
