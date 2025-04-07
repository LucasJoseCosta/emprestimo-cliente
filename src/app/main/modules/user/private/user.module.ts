import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { CoreCommonModule } from '../../../../@core/common.module';
import { UserComponent, UserListComponent } from './views';
import { BreadcrumbModule, ListingModule } from '../../../../@core/components';

@NgModule({
    declarations: [UserListComponent, UserComponent],
    imports: [CoreCommonModule, UserRoutingModule, ListingModule, BreadcrumbModule],
    exports: [UserListComponent, UserComponent],
})
export class UserModule {}
