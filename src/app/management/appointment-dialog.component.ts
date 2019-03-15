import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../shared';
import { Visitor } from '@angular/compiler/src/render3/r3_ast';

@Component ({
    templateUrl: 'appointment-dialog.component.html',
    styleUrls: ['appointment-dialog.component.css'],
    providers: [EmployeeService]
})
export class AppointmentDialogComponent implements OnInit{
    minDate: any;
    employees: Employee[];
    visitor: Visitor;

    constructor(private employeeService: EmployeeService) {}

    ngOnInit(): void {
        this.minDate = new Date();
    }

    getEmployees(): void {
        this.employeeService.getEmployees().subscribe(employees => (this.employees = employees));
    }

    onSubmit(formValues) {

    }

    newVisitor(name: string, fistname: string, company:string, email?:string) {

    }

    newAppointment(subject: string, employee_id: BigInteger, visitor_id: BigInteger, start: Date, end: Date, location?: string) {

    }
}