import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-chart-pie',
    templateUrl: './chart-pie.component.html',
    standalone: false,
})
export class ChartPieComponent {
    @Input() data!: ChartData;

    @Input() options!: ChartOptions;
}
