import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ListingComponent } from './listing.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CoreCommonModule } from '../../common.module';

@NgModule({
    declarations: [ListingComponent],
    imports: [CoreCommonModule, TableModule, PaginatorModule, ButtonModule],
    exports: [ListingComponent],
})
export class ListingModule {}
