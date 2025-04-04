import { Component } from '@angular/core';
import { AuthenticateService } from '../main/modules/auth/shared/services';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    standalone: false,
})
export class LayoutComponent {
    public exibirMenu: boolean;

    private readonly authService: AuthenticateService;

    private readonly router: Router;

    private readonly activatedRoute: ActivatedRoute;

    constructor(authService: AuthenticateService, router: Router, activatedRoute: ActivatedRoute) {
        this.exibirMenu = false;
        //Injectables
        this.authService = authService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.exibirMenu = !event.urlAfterRedirects.startsWith('/auth/login');
            }
        });
    }
}
