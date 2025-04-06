import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../../../@core/common.module';
import { TopbarComponent } from './topbar.component';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [TopbarComponent],
    imports: [CoreCommonModule, MenubarModule, CommonModule],
    exports: [TopbarComponent],
})
export class TopbarModule {}
