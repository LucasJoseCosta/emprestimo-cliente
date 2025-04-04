import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { ContentModule } from './components/content/content.module';
import { MenusModule } from './components/menu/menus.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [LayoutComponent],
    imports: [CommonModule, ContentModule, MenusModule],
    exports: [LayoutComponent],
})
export class LayoutModule {}
