import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent } from './views';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'login',
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
