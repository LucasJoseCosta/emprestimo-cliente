import { NgModule } from '@angular/core';
import { CustomerListComponent, CustomerComponent } from './views';
import { CoreCommonModule } from '../../../../@core/common.module';
import { CustomerRoutingModule } from './customers-router.module';
import { ListingModule } from '../../../../@core/listing/listing.module';

@NgModule({
    declarations: [CustomerListComponent, CustomerComponent],
    imports: [CoreCommonModule, CustomerRoutingModule, ListingModule],
    exports: [],
})
export class CustomerModule {}
