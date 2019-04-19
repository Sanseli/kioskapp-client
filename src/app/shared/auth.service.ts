import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { User } from '.';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('EmployeeService');
    }

    register(user: User): Observable<{}> {
        return this.http
        .post<User>('api/register', user)
        .pipe(catchError(this.handleError('register', user)));
    }
}