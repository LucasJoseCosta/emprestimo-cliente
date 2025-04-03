import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartAction } from '../../../types';

@Component({
    selector: 'app-chart-bar',
    templateUrl: './chart-bar.componet.html',
    standalone: false,
})
export class ChartBarComponent implements OnInit {
    // Region Inputs
    @Input() public data!: ChartData;

    @Input() public options!: ChartOptions;

    @Input() public actions!: Array<ChartAction>;

    @Input() public defaultAction!: string;

    @Input() public title!: string;
    // EndRegion Inputs

    // Region public props
    public selectedAction!: ChartAction | null;
    // Endregion public props

    // Region Life cycle
    ngOnInit(): void {
        if (this.actions) {
            this.selectedAction = this.actions.find((action) => action.label === this.defaultAction) || null;
        }
    }
    // EndRegion life cycle

    // Region public methods
    public callAction(action: ChartAction): void {
        if (action && typeof action.callback === 'function') {
            action.callback();
        }
    }

    public onActionSelect(action: ChartAction): void {
        if (action && typeof action.callback === 'function') {
            action.callback();
        }
    }
    // Endregion public methods
}
