import { Injectable } from '@angular/core'
import { Employee, Visitor } from './models';
import { HttpClient } from '@angular/common/http'
import { HttpErrorHandler, HandleError } from 'src/app/http-error-handler.service'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class EmailService {
    private handleError: HandleError;

    constructor(private http: HttpClient) {
    }

    sendEmail(visitor: Visitor): Observable<Visitor> {
        return this.http
            .post<Visitor>('api/sendEmail', visitor)
            .pipe(catchError(this.handleError('sendEmail', visitor)));
    }

}