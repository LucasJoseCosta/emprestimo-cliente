import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-router.module';
import { CoreCommonModule } from '../../../../@core/common.module';
import { LoginComponent, RegisterComponent } from './views';

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [CoreCommonModule, AuthRoutingModule],
    exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
