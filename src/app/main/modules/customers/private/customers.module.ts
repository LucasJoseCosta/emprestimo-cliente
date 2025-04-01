import { NgModule } from '@angular/core';
import { CustomerListComponent, CustomerComponent } from './views';
import { CoreCommonModule } from '../../../../@core/common.module';
import { CustomerRoutingModule } from './customers-router.module';
import { ListingModule, BreadcrumbModule } from '../../../../@core/components';

@NgModule({
    declarations: [CustomerListComponent, CustomerComponent],
    imports: [CoreCommonModule, CustomerRoutingModule, ListingModule, BreadcrumbModule],
    exports: [],
})
export class CustomerModule {}
