import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { User } from '.';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private handleError: HandleError;
    token: any;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('EmployeeService');
    }

    register(user: User): Observable<{}> {
        return this.http
        .post<User>('api/register', user)
        .pipe(catchError(this.handleError('register', user)));
    }

    details(token): Observable<{}> {
        this.token = token;

        return this.http
        .post('api/details', this.token)
        .pipe(catchError(this.handleError('details')));
    }

    login(user: User): Observable<{}> {
        return this.http
        .post<User>('api/login', user)
        .pipe(catchError(this.handleError('login', user)));
    }
}