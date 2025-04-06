import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    GuardResult,
    MaybeAsync,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthenticateService } from '../../main/modules/auth/shared/services';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private readonly authService: AuthenticateService;
    private readonly router: Router;

    constructor(authService: AuthenticateService, router: Router) {
        //Injectables
        this.authService = authService;
        this.router = router;
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        console.log('entrou auqi');
        if (this.authService.isTokenValid()) {
            if (state.url === '/auth/login') {
                return this.router.navigate(['/dashboard']);
            }
            return true;
        }

        if (!this.authService.isTokenValid() && !state.url.startsWith('/auth')) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        return true;
    }
}
