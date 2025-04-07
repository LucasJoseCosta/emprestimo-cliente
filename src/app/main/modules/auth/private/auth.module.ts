import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-router.module';
import { CoreCommonModule } from '../../../../@core/common.module';
import { LoginComponent } from './views';

@NgModule({
    declarations: [LoginComponent],
    imports: [CoreCommonModule, AuthRoutingModule],
    exports: [LoginComponent],
})
export class AuthModule {}
