import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../@core/common.module';
import { HomeComponent } from './private/views/home.component';
import { HomeRoutingModule } from './home-router.module';
import { QuotePanelModule } from '../../@core/components';
import { ChartModule } from '../../@core/components/chart/chart.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CoreCommonModule, HomeRoutingModule, QuotePanelModule, ChartModule],
    exports: [],
})
export class HomeModule {}
