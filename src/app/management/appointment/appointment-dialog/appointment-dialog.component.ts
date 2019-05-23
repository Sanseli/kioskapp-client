import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService, Employee, VisitorService, Visitor } from '../../../shared';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '../../../material';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component ({
    templateUrl: 'appointment-dialog.component.html',
    styleUrls: ['appointment-dialog.component.css'],
    providers: [EmployeeService]
})
export class AppointmentDialogComponent implements OnInit {
    cancel: boolean;
    minDate: any;
    employees: Employee[];
    visitors: Visitor[];
    isLinear = true;

    constructor(private employeeService: EmployeeService, private visitorService: VisitorService,
        private dialogRef: MatDialogRef<AppointmentDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
        private route: ActivatedRoute, private snackBar: MatSnackBar) {
            this.employees = data.comp.employees;
        }

    ngOnInit(): void {
        this.minDate = new Date();
    }

    onSubmit(formValues) {
        if (this.cancel !== true) {
            this.newVisitor(formValues.nameVisitor, formValues.firstnameVisitor, formValues.emailVisitor,
            formatDate(formValues.date, 'dd-MM-yyyy', 'en'), formValues.employee.id, formValues.subject,
            false, formValues.companyVisitor, formValues.telVisitor, formValues.location);
        }
        this.dialogRef.close();
    }

    newVisitor(name: string, firstname: string, email: string, day: string, employee_id: number, subject: string,
        loggedIn: boolean, company?: string, telnr?: string,  location?: string) {
        const newVisitor: Visitor = {name, firstname, email, company, day, subject, employee_id,
            location, telnr,  loggedIn} as Visitor;

        this.visitorService.addVisitor(newVisitor).subscribe(res => {
            if (res['id'] !== undefined) {
                this.snackBar.open('Afspraak is opgeslagen.', '', {
                    panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'
                });
            } else {
                this.snackBar.open('Er is iets mis gegaan, probeer opnieuw.', '', {
                    panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'
                });
            }
        });
    }

    onCancel() {
        this.cancel = true;
        this.dialogRef.close();
    }

}
