import { Component, OnInit } from '@angular/core';
import { UserForm, UserFormValue } from '../../forms';
import { UntypedFormGroup } from '@angular/forms';
import { ConvertedEnum } from '../../../../../../@core/types';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../../shared/services/user.service';
import { UserFormService } from '../../services';
import { ToastService } from '../../../../../../@core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRole } from '../../../../auth/shared/types';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    standalone: false,
})
export class UserComponent implements OnInit {
    // Region public props
    /**
     * @inheritDoc
     */
    public isLoading!: boolean;
    /**
     * @inheritDoc
     */
    public user!: User;
    /**
     * @inheritDoc
     */
    public userForm!: UntypedFormGroup;
    /**
     * @inheritDoc
     */
    public rolesConverted!: Array<ConvertedEnum>;
    /**
     * @inheritDoc
     */
    public breadcrumbItems: Array<MenuItem>;
    // Endregion public props
    // Region private props
    private readonly userService: UserService;
    private readonly userFormService: UserFormService;
    private readonly toastService: ToastService;
    private readonly router: Router;
    private readonly activatedRoute: ActivatedRoute;
    // Endregion private props
    // Region Constructor
    constructor(
        userService: UserService,
        userFormService: UserFormService,
        toastService: ToastService,
        router: Router,
        activatedRoute: ActivatedRoute
    ) {
        // Init props
        this.breadcrumbItems = [
            { label: 'Usuários', routerLink: '/usuarios' },
            { label: 'Usuário', disabled: true },
        ];
        // Injectables
        this.userService = userService;
        this.userFormService = userFormService;
        this.toastService = toastService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    // Endregion constructor
    // Region lifecycle
    ngOnInit(): void {
        this.isLoading = true;
        this.rolesConverted = this.convertEnum(UserRole);

        this.activatedRoute.params.subscribe((params) => {
            const id = Number(params['id']);
            if (id) {
                this.userService.findById(id).subscribe(
                    (user) => {
                        this.user = user;
                        this.userForm = this.userFormService.create(this.user);
                        this.isLoading = false;
                    },
                    (error) => {
                        this.toastService.showError('Error', error.message);
                        this.isLoading = false;
                        this.router.navigate(['/usuarios']);
                    }
                );
            } else {
                this.isLoading = false;
                this.userForm = this.userFormService.create();
            }
        });
    }
    // Endregion lifecycle
    // Region public Methods
    public save() {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }

        this.userFormService.merge(this.userForm, this.user).then((user: User) => {
            this.userService.save(user).subscribe(
                (user) => {
                    this.toastService.showSuccess('Adicionado', 'Usuário salvo com sucesso');
                    this.router.navigate(['/usuarios']);
                },
                (error) => {
                    this.toastService.showError('Error', error.message);
                }
            );
        });
    }

    public cancelar() {
        this.router.navigate(['/usuarios']);
    }
    // Region private methods
    private convertEnum<T extends Record<string, string | number>>(enumObj: T): Array<ConvertedEnum> {
        return Object.entries(enumObj).map(([key, value]) => ({
            name: key,
            value: value,
        }));
    }
}
