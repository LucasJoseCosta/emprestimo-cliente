import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartAction } from '../../../types';

@Component({
    selector: 'app-chart-bar',
    templateUrl: './chart-bar.componet.html',
    standalone: false,
})
export class ChartBarComponent {
    @Input() data!: ChartData;

    @Input() options!: ChartOptions;

    @Input() actions!: Array<ChartAction>;

    public callAction(action: ChartAction): void {
        if (action && typeof action.callback === 'function') {
            action.callback();
        }
    }
}
