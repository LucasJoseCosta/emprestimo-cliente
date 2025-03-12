import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerListComponent, CustomerComponent } from './views';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CustomerListComponent,
            },
            {
                path: 'create',
                component: CustomerComponent,
            },
            {
                path: ':id',
                component: CustomerComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class CustomerRoutingModule {}
