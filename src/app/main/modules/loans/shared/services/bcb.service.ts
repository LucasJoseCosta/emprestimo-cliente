import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Coin, CurrencyQuote, CurrencyQuoteParams } from '../types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BCBService {
    // Region private props
    /**
     * Serviço para realiziar chamads HTTP
     * @injected
     */
    private readonly httpClient: HttpClient;

    /**
     * URL base para requisições
     */
    private readonly resourceUrl: string;
    // EndRegion private props

    constructor(httpClient: HttpClient) {
        // Injectables
        this.httpClient = httpClient;

        // Privates
        this.resourceUrl = `${environment.apiUrl}/bcb`;
    }

    public getCoins(): Observable<Array<Coin>> {
        return this.httpClient.get<Array<Coin>>(`${this.resourceUrl}/moedas`, { withCredentials: true });
    }

    public getCurrencysQuotes(params: CurrencyQuoteParams): Observable<Array<CurrencyQuote>> {
        let paramsReq = new HttpParams();

        if (params.moeda) {
            paramsReq = paramsReq.set('moeda', params.moeda);
        }

        if (params.data) {
            paramsReq = paramsReq.set('data', params.data);
        }

        return this.httpClient.get<Array<CurrencyQuote>>(`${this.resourceUrl}/cotacao`, {
            params: paramsReq,
            withCredentials: true,
        });
    }
}
