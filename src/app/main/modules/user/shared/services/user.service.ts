import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ListingFindPaginatedParams, PaginatedResult, PaginatedResultMetadata } from '../../../../../@core/types';
import { User } from '../../../auth/shared/types';

@Injectable({
    providedIn: 'root',
})
export class UserService {
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

    // Region constructor
    constructor(httpClient: HttpClient) {
        // Injectables
        this.httpClient = httpClient;

        // Privates
        this.resourceUrl = `${environment.apiUrl}/users`;
    }
    // EndRegion constructor

    // Region public methods
    public findPaginated(listingFindPaginatedParams?: ListingFindPaginatedParams): Observable<PaginatedResult<User>> {
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
                if (sortProperty.includes('.')) {
                    sortProperty = sortProperty.replace('.', '_');
                }
                params = params.set('sort', `${sortProperty},${listingFindPaginatedParams.sort.direction}`);
            }
        }

        return this.httpClient.get<PaginatedResult<User>>(this.resourceUrl, { params, withCredentials: true }).pipe(
            map((response: PaginatedResult<User>) => {
                const content: User[] = response.content || [];
                const metadata = PaginatedResultMetadata.fromResponse(response);
                return new PaginatedResult<User>(content, metadata);
            })
        );
    }

    public findById(id: number): Observable<User> {
        return this.httpClient.get<User>(`${this.resourceUrl}/${id}`, { withCredentials: true });
    }

    public save(user: User): Observable<User> {
        if (user.id == null) {
            return this.httpClient.post<User>(this.resourceUrl, user, { withCredentials: true });
        } else {
            return this.httpClient.put<User>(`${this.resourceUrl}/${user.id}`, user, { withCredentials: true });
        }
    }

    public deleteById(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.resourceUrl}/${id}`, { withCredentials: true });
    }
    // EndRegion public methods
}
