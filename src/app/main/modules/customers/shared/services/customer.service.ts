import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListingFindPaginatedParams, PaginatedResult, PaginatedResultMetadata } from '../../../../../@core/types';
import { Customer } from '../types';
import { environment } from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
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
        this.resourceUrl = `${environment.apiUrl}/clientes`;
    }

    // Region public methods

    public findPaginated(
        listingFindPaginatedParams?: ListingFindPaginatedParams
    ): Observable<PaginatedResult<Customer>> {
        let params = new HttpParams();

        if (listingFindPaginatedParams) {
            if (listingFindPaginatedParams.pageNumber !== undefined) {
                params = params.set('page', listingFindPaginatedParams.pageNumber.toString());
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

                if (sortProperty === 'statusTable') {
                    sortProperty = 'status.status';
                }

                params = params.set('sort', `${sortProperty},${listingFindPaginatedParams.sort.direction}`);
            }
            if (listingFindPaginatedParams.searchTerm !== undefined) {
                params = params.set('searchTerm', listingFindPaginatedParams.searchTerm);
            }
        }

        return this.httpClient.get<any>(this.resourceUrl, { params }).pipe(
            map((response) => {
                const content: Customer[] = response.content || [];
                const metadata = PaginatedResultMetadata.fromResponse(response);
                return new PaginatedResult<Customer>(content, metadata);
            })
        );
    }

    public findById(id: number): Observable<Customer> {
        return this.httpClient.get<Customer>(`${this.resourceUrl}/${id}`);
    }

    public save(customer: Customer): Observable<Customer> {
        if (customer.id == null) {
            return this.httpClient.post<Customer>(this.resourceUrl, customer);
        }
        return this.httpClient.put<Customer>(`${this.resourceUrl}/${customer.id}`, customer);
    }

    public deleteById(id: number): Observable<Customer> {
        return this.httpClient.delete<Customer>(`${this.resourceUrl}/${id}`);
    }
    // EndRegion public methods
}
