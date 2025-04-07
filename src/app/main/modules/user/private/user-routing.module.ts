import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent, UserListComponent } from './views';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UserListComponent,
            },
            {
                path: 'create',
                component: UserComponent,
            },
            {
                path: ':id',
                component: UserComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class UserRoutingModule {}
