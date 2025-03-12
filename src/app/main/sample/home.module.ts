import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../@core/common.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-router.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CoreCommonModule, HomeRoutingModule],
    exports: [],
})
export class HomeModule {}
