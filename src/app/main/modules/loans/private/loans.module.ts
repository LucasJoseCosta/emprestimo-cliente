import { NgModule } from '@angular/core';
import { LoansComponent, LoansListComponent, LoansSimulatorComponent } from './views';
import { CoreCommonModule } from '../../../../@core/common.module';
import { LoansRoutingModule } from './loands-router.module';
import { ListingModule, BreadcrumbModule } from '../../../../@core/components';

@NgModule({
    declarations: [LoansComponent, LoansListComponent, LoansSimulatorComponent],
    imports: [CoreCommonModule, LoansRoutingModule, ListingModule, BreadcrumbModule],
    exports: [],
})
export class LoansModule {}
