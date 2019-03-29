import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService, Employee, VisitorService, Visitor } from '../../shared';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../material';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component ({
    templateUrl: 'appointment-dialog.component.html',
    styleUrls: ['appointment-dialog.component.css'],
    providers: [EmployeeService]
})
export class AppointmentDialogComponent implements OnInit {
    minDate: any;
    employees: Employee[];
    visitors: Visitor[];
    isLinear = true;

    constructor(private employeeService: EmployeeService, private visitorService: VisitorService,
        private dialogRef: MatDialogRef<AppointmentDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
        private route: ActivatedRoute ) {
            this.employees = data.comp.employees;
            console.log();
        }

    ngOnInit(): void {
        this.minDate = new Date();
    }

    onSubmit(formValues) {
        this.newVisitor(formValues.nameVisitor, formValues.firstnameVisitor, formValues.emailVisitor,
            formatDate(formValues.date, 'yyyy-MM-dd', 'en'), formValues.employee.id, formValues.subject,
            false, formValues.companyVisitor, formValues.telVisitor,
            formValues.location);

        this.dialogRef.close();
    }

    newVisitor(name: string, firstname: string, email: string, day: string, employee_id: number, subject: string,
        loggedIn: boolean, company?: string, telnr?: string,  location?: string) {
        const newVisitor: Visitor = {name, firstname, email, company, day, subject, employee_id,
            location, telnr,  loggedIn} as Visitor;
        this.visitorService.addVisitor(newVisitor).subscribe();
    }

}
