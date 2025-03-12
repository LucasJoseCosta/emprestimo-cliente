import { NgModule } from '@angular/core';
import { TopbarModule } from './topbar/topbar.module';

@NgModule({
    imports: [TopbarModule],
    exports: [TopbarModule],
})
export class MenusModule {}
