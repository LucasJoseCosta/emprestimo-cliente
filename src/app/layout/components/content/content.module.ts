import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from './content.component';

@NgModule({
    declarations: [ContentComponent],
    imports: [RouterOutlet],
    exports: [ContentComponent],
})
export class ContentModule {}
