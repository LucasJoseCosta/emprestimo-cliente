import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './@core/helpers';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // Home page
            {
                path: 'dashboard',
                loadChildren: () => import('./main/sample/home.module').then((m) => m.HomeModule),
                canActivate: [AuthGuard],
            },
            // Auth page
            {
                path: 'auth',
                loadChildren: () => import('./main/modules/auth/private/auth.module').then((m) => m.AuthModule),
                canActivate: [AuthGuard],
            },
            // Customers module
            {
                path: 'clientes',
                loadChildren: () =>
                    import('./main/modules/customers/private/customers.module').then((m) => m.CustomerModule),
                canActivate: [AuthGuard],
            },
            // Loans module
            {
                path: 'emprestimos',
                loadChildren: () => import('./main/modules/loans/private/loans.module').then((m) => m.LoansModule),
                canActivate: [AuthGuard],
            },
            // Gerais
            {
                path: '',
                redirectTo: '/auth/login',
                pathMatch: 'full',
            },
        ]),
    ],
    declarations: [],
    exports: [RouterModule],
})
export class AppRouterModule {}
