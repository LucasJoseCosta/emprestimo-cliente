import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../../../@core/common.module';
import { TopbarComponent } from './topbar.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
    declarations: [TopbarComponent],
    imports: [CoreCommonModule, MenubarModule],
    exports: [TopbarComponent],
})
export class TopbarModule {}
