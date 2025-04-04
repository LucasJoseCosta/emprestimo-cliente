import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartComponent } from './chart.component';
import { PanelModule } from 'primeng/panel';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ChartComponent],
    imports: [CommonModule, FormsModule, ChartModule, PanelModule, SelectButton],
    exports: [ChartComponent],
})
export class ChartComponentModule {}
