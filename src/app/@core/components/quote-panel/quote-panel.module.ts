import { NgModule } from '@angular/core';
import { QuotePanelComponent } from './quote-panel.component';
import { CoreCommonModule } from '../../common.module';

@NgModule({
    declarations: [QuotePanelComponent],
    imports: [CoreCommonModule],
    exports: [QuotePanelComponent],
})
export class QuotePanelModule {}
