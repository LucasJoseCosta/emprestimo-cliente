import { NgModule } from '@angular/core';
import { LoansComponent, LoansListComponent, LoansSimulatorComponent } from './views';
import { CoreCommonModule } from '../../../../@core/common.module';
import { LoansRoutingModule } from './loands-router.module';
import { ListingModule } from '../../../../@core/components/listing/listing.module';

@NgModule({
    declarations: [LoansComponent, LoansListComponent, LoansSimulatorComponent],
    imports: [CoreCommonModule, LoansRoutingModule, ListingModule],
    exports: [],
})
export class LoansModule {}
