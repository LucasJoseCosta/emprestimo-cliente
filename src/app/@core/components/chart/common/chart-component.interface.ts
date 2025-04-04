import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartAction } from './chart-action.type';

export interface IChartComponent {
    // Region public props
    /**
     * Tipo de gráfico
     */
    type: ChartType;
    /**
     * Dados de gráfico
     */
    data: ChartData;
    /**
     * Opções de gráfico
     */
    options: ChartOptions;
    /**
     * Ações de botões do gráfico
     */
    actions: Array<ChartAction>;
    /**
     * Flag de ação default
     */
    defaultAction: string;
    /**
     * Titulo do gráfico
     */
    title: string;
    // EndRegion public props
}
