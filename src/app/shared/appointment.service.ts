import { Injectable } from '@angular/core';
import { Appointment } from './models';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from 'src/app/http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('AppointmentService')
    }

    getAppointments(): Observable<Appointment[]> {
        return this.http
        .get<Appointment[]>('api/appointments')
        .pipe(catchError(this.handleError('getAppointments', [])));
    }

    addAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http
            .post<Appointment>('api/appointment', appointment)
            .pipe(catchError(this.handleError('addAppointment', appointment)));
    }

    deleteAppointment(id: number): Observable<{}> {
        const url = `api/appointment/${id}`;
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteAppointment')));
    }

}

