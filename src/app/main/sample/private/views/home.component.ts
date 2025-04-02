import { Component, OnInit } from '@angular/core';
import { QuotesTab } from '../../../../@core/types';
import { BCBService } from '../../../modules/loans/shared/services/bcb.service';
import { CurrencyQuoteParams } from '../../../modules/loans/shared/types';
import { forkJoin, Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false,
})
export class HomeComponent implements OnInit {
    // Region public props
    public isLoading!: boolean;

    public quotesTabs!: Array<QuotesTab>;
    // EndRegion public props

    // Region private props
    private readonly bcbService: BCBService;
    // EndRegion private props

    // Region constructor
    constructor(bcbService: BCBService) {
        // Init public props
        this.isLoading = true;
        this.quotesTabs = [];

        //Injectables
        this.bcbService = bcbService;
    }
    // EndRegion constructor

    // Region life cycle
    ngOnInit(): void {
        this.isLoading = true;
        this.bcbService.getCoins().subscribe((coins) => {
            let requests = coins.map((coin) => this.getCurrencyQuoteObservable(coin.simbolo, new Date(), 0));

            forkJoin(requests).subscribe(
                (result) => {
                    this.isLoading = false;
                },
                (error) => {
                    console.error(error);
                    this.isLoading = false;
                }
            );
        });
    }
    // EndRegion life cycle

    /**
     * Retorna um Observable para buscar a cotação da moeda
     */
    private getCurrencyQuoteObservable(currency: string, date: Date, retryCount: number): Observable<void> {
        return new Observable<void>((observer) => {
            this.tryGetCurrencyQuote(currency, date, retryCount, observer);
        });
    }

    /**
     * Faz a requisição de taxa de conversão
     */
    private tryGetCurrencyQuote(currency: string, date: Date, retryCount: number, observer: Observer<void>): void {
        let formattedDate = this.formatDate(date);

        let quotesParams: CurrencyQuoteParams = {
            moeda: currency,
            data: formattedDate,
        };

        this.bcbService.getCurrencysQuotes(quotesParams).subscribe(
            (response) => {
                if (response) {
                    let quoteTab: QuotesTab = {
                        tab: currency,
                        value: response[response.length - 1].cotacaoVenda,
                    };
                    this.quotesTabs.push(quoteTab);
                    observer.next();
                    observer.complete();
                } else {
                    let previousDate = new Date(date);
                    previousDate.setDate(date.getDate() - 1);
                    if (retryCount < 2) {
                        this.tryGetCurrencyQuote(currency, previousDate, retryCount + 1, observer);
                    } else {
                        observer.error('Não foi possível obter a cotação.');
                    }
                }
            },
            (error) => {
                console.error(error);
                observer.error(error);
            }
        );
    }

    /**
     * Formata data para requisição de taxa de conversão
     * @param date
     * @returns string
     */
    private formatDate(date: Date): string {
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let year = date.getFullYear();

        return `${month}-${day}-${year}`;
    }
}
