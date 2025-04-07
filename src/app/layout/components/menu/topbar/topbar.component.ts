import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticateService } from '../../../../main/modules/auth/shared/services';
import { ToastService } from '../../../../@core/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    standalone: false,
})
export class TopbarComponent implements OnInit {
    // Region public props
    @Input()
    public items: MenuItem[] = [];
    // EndRegion public props
    // Region private props
    private readonly authService: AuthenticateService;
    private readonly toastService: ToastService;
    private readonly router: Router;
    // EndRegion private props

    // Region constructor
    constructor(authService: AuthenticateService, toastService: ToastService, router: Router) {
        // Injectables
        this.authService = authService;
        this.toastService = toastService;
        this.router = router;
    }
    // EndRegion constructor

    ngOnInit(): void {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                iconStyle: { color: '#2CCFCF' },
                routerLink: '/',
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-money-bill',
                iconStyle: { color: '#2CCFCF' },
                items: [
                    {
                        label: 'Lista Empréstimos',
                        icon: 'pi pi-receipt',
                        iconStyle: { color: '#2CCFCF' },
                        routerLink: '/emprestimos',
                    },
                    {
                        label: 'Simular Empréstimo',
                        icon: 'pi pi-calculator',
                        iconStyle: { color: '#2CCFCF' },
                        routerLink: '/emprestimos/simulador',
                    },
                ],
            },
            {
                label: 'Clientes',
                icon: 'pi pi-users',
                iconStyle: { color: '#2CCFCF' },
                routerLink: '/clientes',
            },
        ];
    }

    // Region public methods
    public logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
        this.toastService.showInfo('Sucesso', 'Logout realizado com sucesso!');
    }
    // EndRegion public methods

    // Region private methods

    // EndRegion private methods
}
