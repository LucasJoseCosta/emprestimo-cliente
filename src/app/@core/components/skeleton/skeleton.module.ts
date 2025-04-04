import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../common.module';
import { SkeletonComponent } from './skeleton.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    declarations: [SkeletonComponent],
    imports: [SkeletonModule],
    exports: [SkeletonComponent],
})
export class SkeletonComponentModule {}
