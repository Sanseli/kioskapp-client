import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee, VisitorService, Visitor, Appointment, AppointmentService } from '../shared';
import { MatDialogRef } from '../material';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component ({
    templateUrl: 'appointment-dialog.component.html',
    styleUrls: ['appointment-dialog.component.css'],
    providers: [EmployeeService]
})
export class AppointmentDialogComponent implements OnInit {
    minDate: any;
    employees: Employee[];
    visitors: Visitor[];

    constructor(private employeeService: EmployeeService, private visitorService: VisitorService,
        private appointmentService: AppointmentService, private dialogRef: MatDialogRef<AppointmentDialogComponent>,
        private route: ActivatedRoute ) {
        }

    ngOnInit(): void {
        this.minDate = new Date();
        this.getEmployees();
        this.getVisitors();
    }

    getEmployees(): void {
        this.employeeService.getEmployees().subscribe(employees => (this.employees = employees));
    }

    onSubmit(formValues) {
        // if (formValues.companyVisitor != null) {
            this.newAppointment(formValues.nameVisitor, formValues.firstnameVisitor, formValues.emailVisitor,
                formatDate(formValues.date, 'yyyy-MM-dd', 'en'), formValues.employee.id, formValues.subject, formValues.companyVisitor,
                formValues.location);
        // } else {
          //  this.newAppointment(formValues.nameVisitor, formValues.firstnameVisitor, formValues.emailVisitor,
            //    formatDate(formValues.date, 'yyyy-MM-dd', 'en'), formValues.startHour, formValues.endHour, formValues.subject,
            // formValues.employee.id, formValues.location);
        // };

        this.dialogRef.close();
    }

    newAppointment(name: string, firstname: string, email: string, day: string, employee_id: number, subject: string, company?: string,
        location?: string) {
        const newAppointment: Appointment = {name, firstname, email, company, day, subject, employee_id,
            location} as Appointment;
        this.appointmentService.addAppointment(newAppointment).subscribe();
    }

    getVisitors(): void {
        this.visitorService.getVisitors().subscribe(visitors => (this.visitors = visitors));
        setTimeout(() => {
          console.log(this.visitors.length);
        }, 1000);
      }

}
