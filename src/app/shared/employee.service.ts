import { Injectable } from '@angular/core'
import { Employee } from './models';
import { HttpClient } from '@angular/common/http'
import { HttpErrorHandler, HandleError } from 'src/app/http-error-handler.service'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class EmployeeService {
    private handleError: HandleError

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('EmployeeService')
    }

    getEmployees(): Observable<Employee[]> {
        return this.http
        .get<Employee[]>('api/employees')
        .pipe(catchError(this.handleError('getEmployees', [])))
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http
            .post<Employee>('api/employee', employee)
            .pipe(catchError(this.handleError('addEmployee', employee)))
    }

    deleteEmployee(id: number): Observable<{}> {
        const url = `api/employee/${id}`
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteEmployee')))
    }

    updateEmployee(employee: Employee): Observable<Employee> {
        return this.http
            .put<Employee>(`api/employee/${employee.id}`, employee)
            .pipe(catchError(this.handleError('updateEmployee', employee)))
    }
}

