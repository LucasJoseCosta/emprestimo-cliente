import { NgModule } from '@angular/core';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartModule } from 'primeng/chart';
import { ChartComponent } from './chart.component';
import { PanelModule } from 'primeng/panel';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ChartComponent, ChartPieComponent],
    imports: [CommonModule, FormsModule, ChartModule, PanelModule, SelectButton],
    exports: [ChartComponent, ChartPieComponent],
})
export class ChartComponentModule {}
