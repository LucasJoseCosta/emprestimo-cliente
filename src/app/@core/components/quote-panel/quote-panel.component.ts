import { Component, Input } from '@angular/core';
import { QuotesTab } from '../../types';

@Component({
    selector: 'app-quote-panel',
    templateUrl: './quote-panel.component.html',
    styleUrls: ['./quote-panel.component.css'],
    standalone: false,
})
export class QuotePanelComponent {
    // Region Inputs & Outputs
    /**
     * Entrada de dados para tabeado
     */
    @Input() public quotesTabs!: Array<QuotesTab>;
    // EndRegion Inputs & Outputs

    // Region constructor
    constructor() {}
    // EndRegion constructor

    // Region Life Cycle
    ngOnInit(): void {}
    // EndRegion Life Cycle

    /**
     * Formata valores de cotações para exibição no front
     * @param value
     * @param currencyCode
     * @returns string
     */
    public formatCurrency(value?: number, currencyCode?: string): string {
        if (value === undefined || value === null || !currencyCode) {
            return '';
        }

        const currencyLocales: Record<string, string> = {
            JPY: 'ja-JP', // Iene Japonês
            USD: 'en-US', // Dólar Americano
            EUR: 'de-DE', // Euro
            GBP: 'en-GB', // Libra Esterlina
            AUD: 'en-AU', // Dólar Australiano
            CAD: 'en-CA', // Dólar Canadense
            CHF: 'de-CH', // Franco Suíço
            DKK: 'da-DK', // Coroa Dinamarquesa
            NOK: 'nb-NO', // Coroa Norueguesa
            SEK: 'sv-SE', // Coroa Sueca
        };

        const locale = currencyLocales[currencyCode] || 'pt-BR';

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: currencyCode === 'JPY' ? 5 : undefined,
        }).format(value);
    }
}
