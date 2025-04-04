import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { LoggedUser, Login, User } from '../types';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthenticateService {
    public currentUser: Observable<User | null>;

    private currentUserSubject: BehaviorSubject<User | null>;

    private readonly httpClient: HttpClient;

    private readonly resourceUrl: string;

    constructor(httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User | null>(
            JSON.parse(localStorage.getItem('currentUser') ?? 'null')
        );
        this.currentUser = this.currentUserSubject.asObservable();

        //Injectables
        this.httpClient = httpClient;

        // Privates
        this.resourceUrl = `${environment.apiUrl}/auth`;
    }

    // getter: currentUserValue
    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public login(login: Login): Observable<LoggedUser> {
        return this.httpClient.post<LoggedUser>(`${this.resourceUrl}/login`, login).pipe(
            map((user) => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    // notify
                    this.currentUserSubject.next(user);
                }
                return user;
            })
        );
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.removeToken();
    }

    public addToken(token: string) {
        localStorage.setItem('jwtToken', token);
    }

    public removeToken() {
        localStorage.removeItem('jwtToken');
    }

    public getToken(): string {
        return localStorage.getItem('jwtToken') ?? '';
    }

    public jwtDecode(): JwtPayload | string {
        let token = this.getToken();
        if (token && token != '') {
            return jwtDecode<JwtPayload>(token);
        }
        return '';
    }

    public hasPermisson(role: string): boolean {
        let user = this.jwtDecode() as User;
        if (user.role == role) {
            return true;
        } else {
            return false;
        }
    }

    public isTokenValid(): boolean {
        const token = this.getToken();
        if (!token) return false;

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));

        const exp = tokenPayload.exp;
        const now = Math.floor(Date.now() / 1000);
        return exp > now;
    }
}
