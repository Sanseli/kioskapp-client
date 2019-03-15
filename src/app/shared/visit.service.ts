import { Injectable } from '@angular/core';
import { Visit } from './models';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from 'src/app/http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VisitService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('VisitService')
    }

    getVisits(): Observable<Visit[]> {
        return this.http
        .get<Visit[]>('api/visits')
        .pipe(catchError(this.handleError('getVisits', [])))
    }

    addVisit(visit: Visit): Observable<Visit> {
        return this.http
            .post<Visit>('api/visit', visit)
            .pipe(catchError(this.handleError('addVisit', visit)));
    }

    deleteVisit(id: number): Observable<{}> {
        const url = `api/visit/${id}`;
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteVisit')));
    }

}

