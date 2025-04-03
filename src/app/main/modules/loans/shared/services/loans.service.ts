import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ListingFindPaginatedParams, PaginatedResult, PaginatedResultMetadata } from '../../../../../@core/types';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Loan, LoanSimulation } from '../types';
import { LoanFormSendValue } from '../../private/forms/loan.form';

@Injectable({
    providedIn: 'root',
})
export class LoanService {
    public set loanSimulationData(data: LoanSimulation) {
        this.loanSimulationDataSubject.next(data);
    }

    public get loanSimulationData$(): Observable<LoanSimulation | null> {
        return this.loanSimulationDataSubject.asObservable();
    }

    private loanSimulationDataSubject = new BehaviorSubject<LoanSimulation | null>(null);

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
        this.resourceUrl = `${environment.apiUrl}/emprestimos`;
    }

    public findPaginated(listingFindPaginatedParams?: ListingFindPaginatedParams): Observable<PaginatedResult<Loan>> {
        let params = new HttpParams();

        if (listingFindPaginatedParams) {
            if (listingFindPaginatedParams.pageNumber !== undefined) {
                params = params.set('number', listingFindPaginatedParams.pageNumber.toString());
            }
            if (listingFindPaginatedParams.pageSize !== undefined) {
                params = params.set('size', listingFindPaginatedParams.pageSize.toString());
            }
            if (
                listingFindPaginatedParams.sort !== undefined &&
                listingFindPaginatedParams.sort.property !== undefined &&
                listingFindPaginatedParams.sort.direction !== undefined
            ) {
                let sortProperty = listingFindPaginatedParams.sort.property;

                if (sortProperty === 'dataVencimentoTable') {
                    sortProperty = 'dataVencimento';
                }

                if (sortProperty === 'periodoParcelamentoTable') {
                    sortProperty = 'periodoParcelamento';
                }

                params = params.set('sort', `${sortProperty},${listingFindPaginatedParams.sort.direction}`);
            }
        }

        return this.httpClient.get<any>(this.resourceUrl, { params }).pipe(
            map((response) => {
                const content: Loan[] = response.content || [];
                const metadata = PaginatedResultMetadata.fromResponse(response);
                return new PaginatedResult<Loan>(content, metadata);
            })
        );
    }

    public findAll(): Observable<Array<Loan>> {
        return this.httpClient.get<Array<Loan>>(`${this.resourceUrl}/all`);
    }

    public findById(id: number): Observable<Loan> {
        return this.httpClient.get<Loan>(`${this.resourceUrl}/${id}`);
    }

    public save(loan: LoanFormSendValue): Observable<Loan> {
        if (loan.id == null) {
            return this.httpClient.post<Loan>(this.resourceUrl, loan);
        } else {
            return this.httpClient.put<Loan>(`${this.resourceUrl}/${loan.id}`, loan);
        }
    }

    public deleteById(id: number): Observable<Loan> {
        return this.httpClient.delete<Loan>(`${this.resourceUrl}/${id}`);
    }

    public loanSimulation(loanSimulation: LoanSimulation): Observable<LoanSimulation> {
        return this.httpClient.post<LoanSimulation>(`${this.resourceUrl}/simular`, loanSimulation);
    }
}
