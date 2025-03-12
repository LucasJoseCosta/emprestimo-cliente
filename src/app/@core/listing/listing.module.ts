import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ListingComponent } from './listing.component';
import { CoreCommonModule } from '../common.module';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [ListingComponent],
    imports: [CoreCommonModule, TableModule, PaginatorModule, ButtonModule],
    exports: [ListingComponent],
})
export class ListingModule {}
