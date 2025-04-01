import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from './content.component';
import { CoreCommonModule } from '../../../@core/common.module';

@NgModule({
    declarations: [ContentComponent],
    imports: [RouterOutlet, CoreCommonModule],
    exports: [ContentComponent],
})
export class ContentModule {}
