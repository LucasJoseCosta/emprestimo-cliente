import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoansComponent, LoansListComponent, LoansSimulatorComponent } from './views';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'simulador',
                component: LoansSimulatorComponent,
            },
            {
                path: '',
                component: LoansListComponent,
            },
            {
                path: 'create',
                component: LoansComponent,
            },
            {
                path: ':id',
                component: LoansComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class LoansRoutingModule {}
