import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/shared/visitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee, Visitor, Appointment } from 'src/app/shared/models';
import { formatDate } from '@angular/common';
import { AppointmentService } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';

@Component ({
    templateUrl: 'login-company.component.html',
    styleUrls: ['login-company.component.css'],
    providers: [EmployeeService]
})
export class LoginCompanyComponent {
  isDirty = true;

  employees: Employee[];
  appointments: Appointment[] = [];

  constructor(private visitorService: VisitorService, private snackBar: MatSnackBar,
    private router: Router, private appointmentService: AppointmentService,
    private route: ActivatedRoute ) {
    this.employees = this.route.snapshot.data['employeeList'];
  }

  openSnackBar() {
    this.snackBar.open('Login is opgeslagen', '', { panelClass: ['blue-snackbar']});
  }

  onSubmit(formValues) {
    const date = new Date();
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en');

    this.addAppointment(formValues.lastName, formValues.firstName, formValues.email, formValues.company,
       formattedDate, formValues.reason, formValues.appointmentWith.id, formValues.phone);
    this.addVisit();

    this.openSnackBar();
    //window.confirm('Login is opgeslagen.');
    this.router.navigate(['/home']);
  }

  cancel() {
    if (window.confirm('Weet u zeker dat u de pagina wilt verlaten?')) {
        this.router.navigate(['/home']);
    }
  }

  toHome() {
    if (window.confirm('Weet u zeker dat u de pagina wilt verlaten?')) {
      this.router.navigate(['/home']) ;
    }
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(appointment => (this.appointments = appointment));
    // setTimeout(() => {
    //   console.log(this.appointments);
    // }, 1500);
  }

  addAppointment(name: string, firstname: string,  email: string, company: string,
      day: string, subject: string, employee_id: number, telnr?: string): void {
    const newAppointment: Appointment = {name, firstname, email, telnr, company, day, subject, employee_id} as Appointment;
    this.appointmentService.addAppointment(newAppointment).subscribe();
  }

  addVisit() {
    this.getAppointments();

    setTimeout(() => {
      console.log(this.appointments);

      let name: string;
      let appointment_id: number;
      let last: Appointment;

      if (this.appointments.length !== 0) {
        last = this.appointments[this.appointments.length - 1];
        console.log(last)
        name =  `${last.name} ${last.firstname}`;
        appointment_id = last.id;

        const newVisitor: Visitor = {appointment_id, name};
        console.log(newVisitor);
        this.visitorService.addVisitor(newVisitor).subscribe();
      }
    }, 3000);
  }
}
