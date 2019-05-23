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
    authentication: string;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('EmployeeService');
    }

    isAuthenticated(): boolean {
        if (this.authentication !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    register(user: User): Observable<{}> {
        return this.http.post<User>('api/register', user);
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

    reset(email): Observable<{}> {
        return this.http
        .post('api/password/create', {'email': email})
        .pipe(catchError(this.handleError('reset', email)));
    }

    delete(userid: number): Observable<{}> {
        return this.http
        .delete(`api/user/delete/${userid}`)
        .pipe(catchError(this.handleError('delete', userid)));
    }

    changePass(user: User): Observable<User> {
        return this.http
        .post<User>(`api/password/reset`, user)
        //.pipe(catchError(this.handleError('changePass', user)));
    }

    findPassChange(token): Observable<{}> {
        return this.http
        .get(`api/password/find/${token}`)
    }

}