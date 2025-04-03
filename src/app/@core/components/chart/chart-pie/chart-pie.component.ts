import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-chart-pie',
    templateUrl: './chart-pie.component.html',
    standalone: false,
})
export class ChartPieComponent {
    // Region Inputs
    /**
     * @inheritdoc
     */
    @Input() public data!: ChartData;
    /**
     * @inheritdoc
     */
    @Input() public options!: ChartOptions;
    /**
     * @inheritdoc
     */
    @Input() public title!: string;
    // EndRegion Inputs
}
