import { Injectable } from '@angular/core';
import { Appointment, Visitor } from './models';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from 'src/app/http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable()
export class AppointmentService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('AppointmentService');
    }

    getAppointments(): Observable<Appointment[]> {
        return this.http
        .get<Appointment[]>('api/appointments')
        .pipe(catchError(this.handleError('getAppointments', [])));
    }

    getAppointmentsByDate(day: string): Observable<Appointment[]> {
        return this.http
        .get<Appointment[]>(`api/appointments/${day}`)
        .pipe(catchError(this.handleError('getAppointmentsByDate', [])));
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

@Injectable()
export class AppointmentResolverService implements Resolve<Appointment[]> {
    constructor(private appointmentService: AppointmentService, ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Appointment[]> {
        const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        return this.appointmentService.getAppointmentsByDate(date);
    }

}

