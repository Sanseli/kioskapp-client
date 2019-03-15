import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Visitor } from './models';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';



@Injectable()
export class VisitorService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('VisitorService');
    }

    getVisitors(): Observable<Visitor[]> {
        return this.http
            .get<Visitor[]>('api/visitors')
            .pipe(catchError(this.handleError('getVisitors', [])));
    }

    addVisitor(visitor: Visitor): Observable<Visitor> {
        return this.http
            .post<Visitor>('api/visitor', visitor)
            .pipe(catchError(this.handleError('addVisitor', visitor)));
    }

    deleteVisitor(id: number): Observable<{}> {
        const url = `api/visitor/${id}`;
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteVisitor')));
    }

    getVisitor(id: number): Observable<Visitor[]> {
        return this.http
            .get<Visitor[]>(`api/visitor/${id}`)
            .pipe(catchError(this.handleError('getVisitor', [])))
    }

    // saveLogin(login){
    //     login.id = 1
    //     LOGINS.push(login)
    // }
}

// const LOGINS:ILogin[] = []
