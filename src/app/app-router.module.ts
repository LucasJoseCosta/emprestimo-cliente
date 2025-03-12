import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // Home page
            {
                path: '',
                loadChildren: () => import('./main/sample/home.module').then((m) => m.HomeModule),
            },
            // Customers module
            {
                path: 'clientes',
                loadChildren: () =>
                    import('./main/modules/customers/private/customers.module').then((m) => m.CustomerModule),
            },
            // Loans module
            {
                path: 'emprestimos',
                loadChildren: () => import('./main/modules/loans/private/loans.module').then((m) => m.LoansModule),
            },
        ]),
    ],
    declarations: [],
    exports: [RouterModule],
})
export class AppRouterModule {}
