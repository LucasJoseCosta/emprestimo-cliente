import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { CoreCommonModule } from '../../common.module';

@NgModule({
    declarations: [BreadcrumbComponent],
    exports: [BreadcrumbComponent],
    imports: [CoreCommonModule],
})
export class BreadcrumbModule {}
