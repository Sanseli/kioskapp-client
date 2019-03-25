import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { Employee } from './models';

@Injectable()
export class EmployeeService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('EmployeeService');
    }

    getEmployees(): Observable<Employee[]> {
        return this.http
        .get<Employee[]>('api/employees')
        .pipe(catchError(this.handleError('getEmployees', [])));
    }

    getEmployee(id: number): Observable<Employee[]> {
        return this.http
        .get<Employee[]>(`api/employee/${id}`)
        .pipe(catchError(this.handleError('getEmployee', [])));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http
            .post<Employee>('api/employee', employee)
            .pipe(catchError(this.handleError('addEmployee', employee)));
    }

    deleteEmployee(id: number): Observable<{}> {
        const url = `api/employee/${id}`;
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteEmployee')));
    }

    updateEmployee(employee: Employee): Observable<Employee> {
        return this.http
            .put<Employee>(`api/employee/${employee.id}`, employee)
            .pipe(catchError(this.handleError('updateEmployee', employee)));
    }
}


@Injectable()
export class EmployeeResolverService implements Resolve<Employee[]> {

    constructor(private employeeService: EmployeeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
        return this.employeeService.getEmployees();
    }

}
