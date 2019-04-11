import { Injectable } from '@angular/core'
import { Visitor, EmailModel } from './models';
import { HttpClient } from '@angular/common/http'
import { HttpErrorHandler, HandleError } from 'src/app/http-error-handler.service'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmailService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('EmailModel')
    }

    sendEmail(vName: string, vFirstname: string): Observable<EmailModel> {
        const newEmailModel = {vName, vFirstname} as EmailModel;
        console.log(newEmailModel);
        return this.http.post<EmailModel>('api/email', newEmailModel);
        // return this.http
        //     .get(`api/email`).pipe();
    }

}