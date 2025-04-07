import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartAction, IChartComponent } from './common';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css'],
    standalone: false,
})
export class ChartComponent implements IChartComponent, OnInit, OnChanges {
    // Region Getters and Setters
    /**
     * Get type
     */
    public get type(): ChartType {
        return this._type;
    }
    /**
     * Set type
     */
    @Input()
    public set type(value: ChartType) {
        this._type = value;
    }
    /**
     * Get data
     */
    public get data(): ChartData {
        return this._data;
    }
    /**
     * Set data
     */
    @Input()
    public set data(value: ChartData) {
        this._data = value;
    }
    /**
     * Get options
     */
    public get options(): ChartOptions {
        return this._options;
    }
    /**
     * Set options
     */
    @Input()
    public set options(value: ChartOptions) {
        this._options = value;
    }
    /**
     * Get actions
     */
    public get actions(): Array<ChartAction> {
        return this._actions;
    }
    /**
     * Set actions
     */
    @Input()
    public set actions(value: Array<ChartAction>) {
        this._actions = value;
    }
    /**
     * Get defaultAction
     */
    public get defaultAction(): string {
        return this._defaultAction;
    }
    /**
     * Set defaultAction
     */
    @Input()
    public set defaultAction(value: string) {
        this._defaultAction = value;
    }
    /**
     * Get title
     */
    public get title(): string {
        return this._title;
    }
    /**
     * Set title
     */
    @Input()
    public set title(value: string) {
        this._title = value;
    }
    // EndRegion Getters and Setters

    // Region private props
    /**
     * Dados do gráfico
     */
    private _type!: ChartType;
    /**
     * Dados do gráfico
     */
    private _data!: ChartData;
    /**
     * Opções de gráfico
     */
    private _options!: ChartOptions;
    /**
     * Ações gráfico
     */
    private _actions!: Array<ChartAction>;
    /**
     * Ação default para iniação de botões
     */
    private _defaultAction!: string;
    /**
     * Titulo gráfico
     */
    private _title!: string;
    // EndRegion private props

    // Region public props
    /**
     * Flag para iniciar ação pré selecionada
     */
    public selectedAction!: ChartAction | null;
    // EndRegion public props

    // Region constructor
    constructor() {}
    // EndRegion constructor

    // Region lifecycle
    ngOnInit(): void {
        if (this.actions) {
            this.selectedAction = this.actions.find((action) => action.label === this.defaultAction) || null;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['type'] != null) {
            this.data = changes['type'].currentValue;
        }
        if (changes['data'] != null) {
            this.data = changes['data'].currentValue;
        }
        if (changes['options'] != null) {
            this.options = changes['options'].currentValue;
        }
        if (changes['actions'] != null) {
            this.actions = changes['actions'].currentValue;
        }
        if (changes['defaultAction'] != null) {
            this.defaultAction = changes['defaultAction'].currentValue;
        }
        if (changes['title'] != null) {
            this.title = changes['title'].currentValue;
        }
    }
    // EndRegion lifecycle

    // Region public methods
    /**
     * Função de callback para ações
     * @param action
     */
    public onActionSelect(action: ChartAction): void {
        if (action && typeof action.callback === 'function') {
            action.callback();
        }
    }
    // Endregion public methods
}
