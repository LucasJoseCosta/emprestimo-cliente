import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-chart-bar',
    templateUrl: './chart-bar.componet.html',
    standalone: false,
})
export class ChartBarComponent {
    @Input() data!: ChartData;

    @Input() options!: ChartOptions;
}
