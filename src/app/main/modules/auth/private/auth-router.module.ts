import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent } from './views';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
        ]),
    ],
    exports: [],
})
export class AuthRoutingModule {}
