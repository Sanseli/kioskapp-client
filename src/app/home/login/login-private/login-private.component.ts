import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/shared/visitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee, Visitor, Appointment} from 'src/app/shared/models';
import { formatDate } from '@angular/common';
import { AppointmentService } from 'src/app/shared';
import { MatSnackBar } from 'src/app/material';

@Component ({
    templateUrl: 'login-private.component.html',
    styleUrls: ['login-private.component.css'],
    providers: [EmployeeService]
})
export class LoginPrivateComponent {
  isDirty = true;

  employees: Employee[];
  appointments: Appointment[] = [];

  constructor(private visitorService: VisitorService, private appointmentService: AppointmentService,
    private router: Router, private emplservice: EmployeeService, private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.employees = this.route.snapshot.data['employeeList'];
  }

  openSnackBar() {
    this.snackBar.open('Login is opgeslagen', '', { panelClass: ['blue-snackbar']});
  }

  onSubmit(formValues) {
    const date = new Date();
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en');

    this.addAppointment(formValues.lastName, formValues.firstName, formValues.email,
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
      this.router.navigate(['/home']);
    }
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(appointment => (this.appointments = appointment));
    // setTimeout(() => {
    //   console.log(this.appointments.length);
    // }, 1500);
  }

  addAppointment(name: string, firstname: string, email: string, day: string, subject: string, employee_id: number, telnr?: string): void {
    const newAppointment: Appointment = {name, firstname, email, telnr,  day, subject, employee_id} as Appointment;
    this.appointmentService.addAppointment(newAppointment).subscribe();
  }

  addVisit() {
    this.appointments = [];
    this.getAppointments();

    setTimeout(() => {
      console.log(this.appointments);

      let name: string;
      let appointment_id: number;
      let last: Appointment;

      if (this.appointments.length !== 0) {
        last = this.appointments[this.appointments.length - 1];
        name =  `${last.name}  ${last.firstname}`;
        appointment_id = last.id;

        const newVisit: Visitor = {appointment_id, name};
        console.log(newVisit);
        this.visitorService.addVisitor(newVisit).subscribe();
      }
    }, 3000);
  }
}
