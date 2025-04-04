import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../@core/common.module';
import { HomeComponent } from './private/views/home.component';
import { HomeRoutingModule } from './home-router.module';
import { QuotePanelModule } from '../../@core/components';

@NgModule({
    declarations: [HomeComponent],
    imports: [CoreCommonModule, HomeRoutingModule, QuotePanelModule],
    exports: [],
})
export class HomeModule {}
