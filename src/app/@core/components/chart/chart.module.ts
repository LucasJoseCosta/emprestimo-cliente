import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../common.module';
import { ChartBarComponent } from './chart-bar/chart-bar.componet';
import { ChartPieComponent } from './chart-pie/chart-pie.component';

@NgModule({
    declarations: [ChartBarComponent, ChartPieComponent],
    imports: [CoreCommonModule],
    exports: [ChartBarComponent, ChartPieComponent],
})
export class ChartModule {}
